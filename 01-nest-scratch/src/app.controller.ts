import { Controller, Get } from "@nestjs/common";

@Controller("/app")
export class AppController {
  @Get("/getMessage")
  getRootRoute() {
    return "hi there";
  }
  @Get("anotherMessage")
  getByThere() {
    return "hello";
  }
}
