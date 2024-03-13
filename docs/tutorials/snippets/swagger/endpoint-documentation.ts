import {BodyParams, QueryParams} from "@tsed/platform-params";
import {Deprecated, Description, Get, Post, Returns, Security, Summary} from "@tsed/schema";
import {Controller} from "@tsed/di";
import {CalendarModel} from "./models/Calendar";

@Controller("/calendars")
export class CalendarCtrl {
  @Get("/:id")
  @Summary("Summary of this route")
  @Description("Return a calendar from the given id")
  @Returns(200, CalendarModel)
  @Returns(404).Description("Not found")
  getCalendar(
    @Description("A calendar Id")
    @QueryParams()
    id: string
  ): Promise<CalendarModel> {
    return Promise.resolve({});
  }

  @Get("/")
  @Description("Return a list of Calendar")
  @Returns(200, CalendarModel)
  getCalendars(): Promise<CalendarModel[]> {
    return Promise.resolve([]);
  }

  @Get("/v0/:id")
  @Deprecated()
  @Description("Deprecated route, use /rest/calendars/:id instead of.")
  @Returns(CalendarModel)
  @Returns(404, {description: "Not found"})
  getCalendarDeprecated(@QueryParams("id") id: string): Promise<CalendarModel> {
    return Promise.resolve({});
  }

  @Post("/")
  @Security("calendar_auth", "write:calendar", "read:calendar")
  @Returns(CalendarModel)
  createCalendar(@BodyParams() body: any): Promise<CalendarModel> {
    return Promise.resolve({});
  }
}
