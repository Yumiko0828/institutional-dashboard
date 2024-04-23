import { Module } from "@nestjs/common";
import { EdaService } from "./eda.service";
import { EdaController } from "./eda.controller";

@Module({
  controllers: [EdaController],
  providers: [EdaService],
})
export class EdaModule {}
