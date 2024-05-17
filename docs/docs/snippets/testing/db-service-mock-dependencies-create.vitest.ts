import {it, expect, describe, beforeEach, afterEach} from "vitest";
import {PlatformTest} from "@tsed/common";
import {MyCtrl} from "../controllers/MyCtrl";
import {DbService} from "../services/DbService";

describe("MyCtrl", () => {
  // bootstrap your Server to load all endpoints before run your test
  beforeEach(() =>
    PlatformTest.create({
      imports: [
        {
          provide: DbService,
          use: {
            getData: () => {
              return "test";
            }
          }
        }
      ]
    })
  );
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance: MyCtrl = PlatformTest.get(MyCtrl);

    // and test it
    expect(!!instance).toEqual(true);
    expect(instance.getData()).toEqual("test");
  });
});
