import {Post} from "@tsed/schema";
import {BodyParams} from "@tsed/platform-params";

class MyController {
  @Post()
  create(@BodyParams({expression: "user", useMapper: false}) body: T): T {
    console.log("payload", body);

    return body;
  }
}
