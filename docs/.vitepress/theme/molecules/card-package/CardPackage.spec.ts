import {render, screen} from "@testing-library/vue";
import CardPackage from "./CardPackage.vue";

describe("<CardPackage />", () => {
  describe("Official", () => {
    it("should render component", () => {
      render(CardPackage, {
        props: {
          name: "@tsed/platform-express",
          description: "A TypeScript Framework on top of Express",
          repository: "https://github.com/tsedio/tsed",
          npm: "https://www.npmjs.com/package/%40tsed%2Fplatform-express",
          icon: "https://tsed.io/expressjs.svg",
          homepage: "https://github.com/tsedio/tsed/tree/production/packages/platform/platform-express",
          maintainers: [
            {
              username: "romakita",
              avatar: "https://www.gravatar.com/avatar/de3f2df14a0230b7cd6372ed50d93573"
            }
          ],
          downloads: 68482,
          stars: 2829,
          tags: ["platform"],
          type: "official",
          category: "framework"
        }
      });

      expect(screen.getByText("@tsed/platform-express")).toBeInTheDocument();
      expect(screen.getByText("A TypeScript Framework on top of Express")).toBeInTheDocument();
      expect(screen.queryByText("PREMIUM")).not.toBeInTheDocument();
      expect(screen.getByTestId("card-icon")).toBeInTheDocument();
      expect(screen.getByTestId("downloads-stats")).toHaveTextContent("68K");
      expect(screen.getByTestId("stars-stats")).toHaveTextContent("2.8K stars");
      expect(screen.getByTestId("card-avatar")).toHaveAttribute(
        "src",
        "https://www.gravatar.com/avatar/de3f2df14a0230b7cd6372ed50d93573?s=48&d=mp"
      );
    });
  });
  describe("Premium", () => {
    it("should render component", () => {
      render(CardPackage, {
        props: {
          name: "@tsed/platform-express",
          description: "A TypeScript Framework on top of Express",
          repository: "https://github.com/tsedio/tsed",
          npm: "https://www.npmjs.com/package/%40tsed%2Fplatform-express",
          icon: "https://tsed.io/expressjs.svg",
          homepage: "https://github.com/tsedio/tsed/tree/production/packages/platform/platform-express",
          maintainers: [
            {
              username: "romakita",
              avatar: "https://www.gravatar.com/avatar/de3f2df14a0230b7cd6372ed50d93573"
            }
          ],
          downloads: 68482,
          stars: 2829,
          tags: ["platform"],
          type: "premium",
          category: "framework"
        }
      });

      expect(screen.getByText("@tsed/platform-express")).toBeInTheDocument();
      expect(screen.getByText("A TypeScript Framework on top of Express")).toBeInTheDocument();
      expect(screen.queryByText("PREMIUM")).toBeInTheDocument();
      expect(screen.getByTestId("downloads-stats")).toHaveTextContent("68K");
      expect(screen.getByTestId("stars-stats")).toHaveTextContent("2.8K stars");
      expect(screen.getByTestId("card-avatar")).toHaveAttribute(
        "src",
        "https://www.gravatar.com/avatar/de3f2df14a0230b7cd6372ed50d93573?s=48&d=mp"
      );
    });
  });
  describe("Community", () => {
    it("should render component", () => {
      render(CardPackage, {
        props: {
          name: "commu-platform-express",
          description: "A TypeScript Framework on top of Express",
          repository: "https://github.com/tsedio/tsed",
          npm: "https://www.npmjs.com/package/%40tsed%2Fplatform-express",
          icon: "",
          homepage: "https://github.com/tsedio/tsed/tree/production/packages/platform/platform-express",
          maintainers: [
            {
              username: "romakita",
              avatar: "https://www.gravatar.com/avatar/de3f2df14a0230b7cd6372ed50d93573"
            }
          ],
          downloads: 68482,
          stars: 2829,
          tags: ["platform"],
          type: "community",
          category: "framework"
        }
      });

      expect(screen.getByText("commu-platform-express")).toBeInTheDocument();
      expect(screen.getByText("A TypeScript Framework on top of Express")).toBeInTheDocument();
      expect(screen.queryByText("PREMIUM")).not.toBeInTheDocument();
      expect(screen.queryByTestId("card-icon")).not.toBeInTheDocument();
      expect(screen.getByTestId("downloads-stats")).toHaveTextContent("68K");
      expect(screen.getByTestId("stars-stats")).toHaveTextContent("2.8K stars");
      expect(screen.getByTestId("card-avatar")).toHaveAttribute(
        "src",
        "https://www.gravatar.com/avatar/de3f2df14a0230b7cd6372ed50d93573?s=48&d=mp"
      );
    });
  });
});
