import {upperFirst} from "./upperFirst";

describe("upperFirst", () => {
  it("should return the string with the first letter in uppercase", () => {
    expect(upperFirst("hello")).toBe("Hello");
  });

  it("should return the string with the first letter in uppercase (sentence)", () => {
    expect(upperFirst("hello world")).toBe("Hello world");
  });

  it("should do nothing when given string is empty", () => {
    expect(upperFirst("")).toBe("");
    expect(upperFirst(undefined)).toBe("");
  });
});
