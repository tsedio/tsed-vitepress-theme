import {Err, Middleware} from "@tsed/plaform-middlewares";

@Middleware()
export class MyMiddlewareError {
  use(@Err() err: unknown) {
    console.log("===> Error:", err);
  }
}
