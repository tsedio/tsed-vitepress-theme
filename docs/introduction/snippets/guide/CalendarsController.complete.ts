import {v4} from "uuid";
import {Controller} from "@tsed/di";
import {NotFound} from "@tsed/exceptions";
import {Delete, Get, Groups, Post, Put, Returns} from "@tsed/schema";
import {BodyParams, PathParams} from "@tsed/platform-params";
import {CalendarModel} from "../../models/CalendarModel";

@Controller("/calendars")
export class CalendarsController {
  private calendars: CalendarModel[] = [];

  @Get("/")
  getAll() {
    return this.calendars;
  }

  @Get("/:id")
  @Returns(200, CalendarModel)
  @Returns(404).Description("Calendar not found")
  getById(@PathParams("id") id: string) {
    const calendar = this.calendars.find((calendar) => calendar.id === id);

    if (!calendar) {
      throw new NotFound("Calendar not found");
    }

    return calendar;
  }

  @Post("/")
  @Returns(201, CalendarModel)
  create(@BodyParams() @Groups("creation") calendar: CalendarModel) {
    calendar.id = v4();

    this.calendars.push(calendar);

    return calendar;
  }

  @Put("/:id")
  @Returns(200, CalendarModel)
  @Returns(404).Description("Calendar not found")
  update(@PathParams("id") id: string, @BodyParams() @Groups("update") calendar: CalendarModel) {
    const index = this.calendars.findIndex((calendar) => calendar.id === id);

    if (index === -1) {
      throw new NotFound("Calendar not found");
    }

    calendar.id = id;
    this.calendars[index] = calendar;

    return calendar;
  }

  @Delete("/:id")
  @Returns(204)
  @Returns(404).Description("Calendar not found")
  remove(@PathParams("id") id: string) {
    const index = this.calendars.findIndex((calendar) => calendar.id === id);

    if (index === -1) {
      throw new NotFound("Calendar not found");
    }

    this.calendars.splice(index, 1);
  }
}
