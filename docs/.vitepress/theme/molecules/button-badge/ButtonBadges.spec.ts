import {render, screen} from "@testing-library/vue";
import ButtonBadges from "./ButtonBadges.vue";

describe("<ButtonBadges>", () => {
  const items = [
    {login: "user1", href: "http://example.com/1", src: "http://example.com/img1.jpg"},
    {login: "user2", href: "http://example.com/2", src: "http://example.com/img2.jpg"}
  ];

  it("renders without errors", () => {
    render(ButtonBadges, {
      props: {items}
    });
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
  });

  it("applies custom class to list items", () => {
    const liClass = "custom-list-item-class";
    render(ButtonBadges, {
      props: {items, liClass}
    });
    const listItemElements = screen.getAllByRole("listitem");
    listItemElements.forEach((element) => {
      expect(element).toHaveClass(liClass);
    });
  });

  it("renders the correct number of ButtonBadge components", () => {
    render(ButtonBadges, {
      props: {items}
    });
    const badges = screen.getAllByText(/user/);
    expect(badges.length).toBe(items.length);
  });

  it("applies padding correctly", () => {
    const padding = "3";
    render(ButtonBadges, {
      props: {items, padding}
    });
    const listElements = screen.getAllByRole("listitem");
    listElements.forEach((element) => {
      expect(element.className).toContain(`px-${padding}`);
    });
  });
});
