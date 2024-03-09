import {Get} from "@tsed/schema";
import {QueryParams} from "@tsed/platform-params";
import {SomeService} from "./SomeService";

export abstract class BaseCtrl {
  constructor(private someService: SomeService) {}

  @Get("/list")
  list(@QueryParams("search") search: any) {
    return this.someService.list(search);
  }
}
