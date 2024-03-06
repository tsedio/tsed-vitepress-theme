import {Configuration} from "@tsed/di";
import * as v0Controllers from "./controllers/v1/index";
import * as v1Controllers from "./controllers/v2/index";

@Configuration({
  mount: {
    "/rest/v0": [...Object.values(v0Controllers)],
    "/rest/v1": [...Object.values(v1Controllers)]
  }
})
export class Server {}
