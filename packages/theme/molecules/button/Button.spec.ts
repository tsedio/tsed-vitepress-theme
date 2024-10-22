import {render} from "@testing-library/vue";
import Button from "./Button.vue";
import VPButton from "../../../../.storybook/mock/VPButton.vue";

describe("<Button>", () => {
  it("should render the Button with default properties and verify presence of elements and attributes", () => {
    const {container} = render(Button, {
      props: {},
      slots: {
        default: "Text"
      },
      global: {
        stubs: {
          VPButton: VPButton
        }
      }
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="VPButton medium brand"
          data-v-64690b57=""
        >
          Text
        </button>
      </div>
    `);
  });
});
