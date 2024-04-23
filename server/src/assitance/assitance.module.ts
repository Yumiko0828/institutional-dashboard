import { Module } from "@nestjs/common";
import { AssitanceService } from "./assitance.service";
import { AssitanceController } from "./assitance.controller";

@Module({
  controllers: [AssitanceController],
  providers: [AssitanceService],
})
export class AssitanceModule {}
