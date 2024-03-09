import {IncomingMessage} from "node:http";
import Axios from "axios";
import {Context} from "@tsed/common";
import {QueryParams} from "@tsed/platform-params";
import {Get} from "@tsed/schema";
import {Controller} from "@tsed/di";

@Controller("/proxy")
export class ProxyCtrl {
  @Get("/")
  proxy(@QueryParams("path") path: string) {
    return Axios.get(`https://cerevoice.s3.amazonaws.com/${path}`, {
      responseType: "stream"
    });
  }

  // is equivalent to doing that
  @Get("/")
  async proxy2(@QueryParams("path") path: string, @Context() $ctx: Context): IncomingMessage {
    const response = await Axios.get(`https://cerevoice.s3.amazonaws.com/${path}`, {
      responseType: "stream"
    });

    return $ctx.response.setHeaders(response.headers).status(response.status).body(response.data);
  }
}
