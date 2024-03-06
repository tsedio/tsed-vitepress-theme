import {Configuration} from "@tsed/common";
import {CalendarCtrl} from "./controllers/CalendarCtrl";

@Configuration({
  mount: {
    // Using manual import
    "/rest": [CalendarCtrl]
  }
})
export class Server {}
