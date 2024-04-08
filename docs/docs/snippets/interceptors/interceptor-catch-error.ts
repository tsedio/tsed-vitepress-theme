import {InterceptorMethods, InterceptorContext, InterceptorNext, Interceptor, Inject} from "@tsed/di";
import {Logger} from "@tsed/logger";
import {nameOf} from "@tsed/core";

@Interceptor()
export class FailSilently implements InterceptorMethods {
  @Inject()
  protected logger: Logger;

  async intercept(context: InterceptorContext<any>, next: InterceptorNext) {
    // let the original method by calling next function
    try {
      return await next();
    } catch (er) {
      this.logger.warn({
        event: "ENDPOINT_ERROR",
        error_name: er.name,
        error_message: er.message,
        args: context.args,
        target_name: nameOf(context.target),
        property_key: context.propertyKey
      });

      return context.options.fallback || [];
    }
  }
}

@Controller("/")
class MyController {
  @Get("/")
  @UseInterceptor(FailSilently)
  async get() {
    throw new Error("test");
  }
}
