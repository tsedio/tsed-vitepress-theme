import {$log} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import dotenv from "dotenv-flow";
import {Server} from "./server";

dotenv.config();

async function bootstrap() {
  try {
    $log.debug("Start server...");
    const platform = await PlatformExpress.bootstrap(Server, {
      envs: process.env
    });

    await platform.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
