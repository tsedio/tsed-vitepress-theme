import {BodyParams} from "@tsed/platform-params";
import {In, Post, Security} from "@tsed/schema";
import {Controller} from "@tsed/di";
import {CalendarModel} from "./models/Calendar";

@Controller("/calendars")
export class CalendarCtrl {
  @Post("/")
  @In("header").Name("authorization").Type(String).Description("Bearer authorization")
  @Security("oidc")
  createCalendar(@BodyParams() body: any): Promise<CalendarModel> {
    return Promise.resolve({});
  }
}
