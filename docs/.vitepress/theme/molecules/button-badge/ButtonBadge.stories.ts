import type {Meta, StoryObj} from "@storybook/vue3";
import {COLORS_LIST} from "../../utils/colors";
import ButtonBadge from "./ButtonBadge.vue";

const meta = {
  title: "ButtonBadge",
  component: ButtonBadge,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    item: {
      control: "object"
    },
    bgColor: {
      control: "select",
      options: COLORS_LIST,
      default: "gray-lighter"
    },
    color: {
      control: "select",
      options: COLORS_LIST,
      default: "blue"
    },
    width: {
      control: "number",
      default: 60
    },
    textSize: {
      control: "select",
      options: ["micro", "xxs", "xs", "sm", "base", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "7xl", "11xl"],
      default: "xxs"
    },
    blur: {
      control: "number",
      default: 0
    },
    fontWeight: {
      control: "select",
      options: ["hairline", "thin", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      default: "normal"
    },
    padding: {
      control: "number",
      default: 0
    },
    shadow: {
      control: "select",
      options: ["default", "sm", "strong", "md", "lg", "top", "inner", "outline", "none"],
      default: "normal"
    }
  }
} satisfies Meta<typeof ButtonBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    item: {
      login: "Romakita",
      id: 1763311,
      node_id: "MDQ6VXNlcjE3NjMzMTE=",
      src: "https://avatars3.githubusercontent.com/u/1763311?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/Romakita",
      href: "https://api.github.com/users/Romakita",
      followers_url: "https://api.github.com/users/Romakita/followers",
      following_url: "https://api.github.com/users/Romakita/following{/other_user}",
      gists_url: "https://api.github.com/users/Romakita/gists{/gist_id}",
      starred_url: "https://api.github.com/users/Romakita/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/Romakita/subscriptions",
      organizations_url: "https://api.github.com/users/Romakita/orgs",
      repos_url: "https://api.github.com/users/Romakita/repos",
      events_url: "https://api.github.com/users/Romakita/events{/privacy}",
      received_events_url: "https://api.github.com/users/Romakita/received_events",
      type: "User",
      site_admin: false,
      contributions: 1532
    }
  }
};
