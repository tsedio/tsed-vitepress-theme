import {expect, userEvent, waitFor} from "@storybook/test";
import Api from "./Api.vue";
import {render, screen} from "@testing-library/vue";
import api from "./__mock__/api.json";
import {mapApiReferences} from "../../composables/api/mappers/mapApiReferences.js";

const apiReferences = mapApiReferences(api);

describe("<Api />", () => {
  it("should render Api component", async () => {
    render(Api, {
      props: {
        modules: apiReferences.modules,
        symbolTypes: apiReferences.symbolTypes
      }
    });

    await waitFor(() => expect(screen.getByText("@tsed/core")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("@tsed/di")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("AnyToPromise")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("AnyToPromiseResponseTypes")).toBeInTheDocument());

    const searchInput = screen.getByRole("searchbox");

    await expect(searchInput).toBeInTheDocument();

    await userEvent.type(searchInput, "AnyToPromise");

    await expect(screen.queryByText("@tsed/di")).not.toBeInTheDocument();

    const classCheckbox = screen.getByRole("checkbox", {name: "Class"});

    await userEvent.click(classCheckbox);

    await waitFor(() => expect(screen.queryByText("AnyToPromiseResponseTypes")).not.toBeInTheDocument());

    await userEvent.click(classCheckbox);
    await userEvent.clear(searchInput);

    await waitFor(() => expect(screen.getByText("@tsed/di")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("AnyToPromise")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("AnyToPromiseResponseTypes")).toBeInTheDocument());
  });
});
