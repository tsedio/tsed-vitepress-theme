import {render, screen} from "@testing-library/vue";
import ButtonBadges from "./ButtonBadges.vue";

function getFixture(props: any = {}) {
  const items = [
    {title: "user1", href: "http://example.com/1", src: "http://example.com/img1.jpg"},
    {title: "user2", href: "http://example.com/2", src: "http://example.com/img2.jpg"}
  ];

  return render(ButtonBadges, {
    props: {items, ...props},
    global: {
      directives: {
        lazyloadObserver: {
          mounted() {},
          updated() {}
        }
      }
    }
  });
}

describe("<ButtonBadges>", () => {
  it("renders without errors", () => {
    getFixture();

    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
  });

  it("applies custom class to list items", () => {
    const liClass = "custom-list-item-class";

    getFixture({liClass});

    const listItemElements = screen.getAllByRole("listitem");
    listItemElements.forEach((element) => {
      expect(element).toHaveClass(liClass);
    });
  });

  it("renders the correct number of ButtonBadge components", () => {
    getFixture();

    const badges = screen.getAllByText(/user/);
    expect(badges.length).toBe(2);
  });

  it("applies padding correctly", () => {
    const padding = 3;

    getFixture({padding});

    expect(screen.getByRole("list")).toHaveClass(`gap-${padding}`);
  });
});
