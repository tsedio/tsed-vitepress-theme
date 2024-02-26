import {Groups, MaxLength, MinLength, Property, Required} from "@tsed/schema";

export class CalendarModel {
  @Property()
  @Groups("!creation")
  @Required()
  id: string;

  @Required()
  @MinLength(3)
  name: string;

  @Required()
  @MaxLength(100)
  description: string;
}
