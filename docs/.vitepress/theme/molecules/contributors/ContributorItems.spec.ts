import {render, screen} from "@testing-library/vue";
import ContributorItems from "./ContributorItems.vue"; // Ensure the path is correct

describe("<ContributorItems>", () => {
  const items = [
    {login: "user1", href: "http://example.com/1", src: "http://example.com/img1.jpg"},
    {login: "user2", href: "http://example.com/2", src: "http://example.com/img2.jpg"}
  ];

  it("renders ButtonBadges when items are present", () => {
    render(ContributorItems, {
      props: {items}
    });
    expect(screen.getByText(items[0].login)).toBeInTheDocument();
    expect(screen.getByText(items[1].login)).toBeInTheDocument();
  });

  it("does not render ButtonBadges when items are empty", () => {
    render(ContributorItems, {
      props: {items: []}
    });
    expect(screen.queryByText(items[0]?.login)).not.toBeInTheDocument();
    expect(screen.queryByText(items[1]?.login)).not.toBeInTheDocument();
  });
});
