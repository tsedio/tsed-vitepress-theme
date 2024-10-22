import {describe, it, expect, vi, beforeEach} from "vitest";
import {mount, VueWrapper} from "@vue/test-utils";
import type {ComponentPublicInstance} from "vue";
import LazyLoadObserver from "./lazyLoadObserver";

const IntersectionObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

describe("LazyLoadObserver Directive", () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  beforeEach(() => {
    IntersectionObserverMock.mockClear();
    IntersectionObserverMock.mockReturnValue({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    });

    const TestComponent = {
      template: '<div v-lazyload-observer><img data-url="test-url"/></div>',
      directives: {
        lazyloadObserver: LazyLoadObserver
      }
    };

    wrapper = mount(TestComponent);
  });

  it("creates an IntersectionObserver on mount if it is available", () => {
    expect(IntersectionObserverMock).toHaveBeenCalledTimes(1);
    // @ts-expect-error
    expect(IntersectionObserverMock.mock.calls[0][0]).toBeInstanceOf(Function);
    expect(IntersectionObserverMock.mock.results[0].value.observe).toHaveBeenCalledOnce();
  });

  it("loads image when the element is intersecting", async () => {
    const img = wrapper.find("img").element as HTMLImageElement;

    // Simulate the IntersectionObserver callback
    // @ts-expect-error
    const handleIntersect: any = IntersectionObserverMock.mock.calls[0][0];

    handleIntersect([{isIntersecting: true, target: img}], IntersectionObserverMock.mock.results[0].value);

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(img.src).toContain("test-url");
    expect(img.classList.contains("opacity-0")).toBe(false);
    expect(IntersectionObserverMock.mock.results[0].value.unobserve).toHaveBeenCalled();
  });

  it("does not load image if not intersecting", () => {
    const img = wrapper.find("img").element as HTMLImageElement;

    // @ts-expect-error
    const handleIntersect: any = IntersectionObserverMock.mock.calls[0][0]!;

    handleIntersect([{isIntersecting: false, target: img}], IntersectionObserverMock.mock.results[0].value);

    expect(img.src).toBe("");
  });

  it("falls back to direct display if IntersectionObserver is not available", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    wrapper = mount({
      template: '<div v-lazyload-observer><img data-url="fallback-url"/></div>',
      directives: {
        lazyloadObserver: LazyLoadObserver
      }
    });

    const img = wrapper.find("img").element as HTMLImageElement;
    expect(img.src).toContain("fallback-url");
  });
});
