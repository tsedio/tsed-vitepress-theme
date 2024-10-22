import {useFilter} from "./useFilter";

describe("useFilter", () => {
  it("should create filter", () => {
    const filter = useFilter("tags.includes('test')");

    const result = filter([{tags: ["test"]}, {tags: ["test", "test2"]}, {tags: ["test2"]}]);

    expect(result).toEqual([{tags: ["test"]}, {tags: ["test", "test2"]}]);
  });

  it("should throw error when syntax is incorrect", () => {
    const filter = useFilter("tags. ('test')");

    expect(() => filter([{tags: ["test"]}])).toThrowError(/CustomFilterError: tags\. \('test'\)/);
  });
});
