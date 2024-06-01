import { Module } from "@nestjs/common";
import { AlService } from "./al.service";
import { AlController } from "./al.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [AlController],
  providers: [AlService],
})
export class AlModule {}
