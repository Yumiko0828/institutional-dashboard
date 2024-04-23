import { Module } from "@nestjs/common";
import { LevelService } from "./level.service";
import { LevelController } from "./level.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
