import {Get} from "@tsed/schema";
import {Controller} from "@tsed/di";
import {PathParams} from "@tsed/platform-params";

interface Calendar {
  id: string;
  name: string;
}

@Controller("/calendars")
export class CalendarCtrl {
  @Get("/:id")
  get(@PathParams("id") id: string): Calendar {
    return {
      id,
      name: "test"
    };
  }
}
