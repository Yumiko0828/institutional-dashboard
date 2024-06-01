import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { StudentsModule } from "./students/students.module";
import { GradeModule } from "./grade/grade.module";
import { AssistanceModule } from "./assistance/assistance.module";
import { ConfigModule } from "@nestjs/config";
import { AlModule } from "./al/al.module";
import { SchedulesModule } from "./schedules/schedules.module";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    StudentsModule,
    GradeModule,
    AssistanceModule,
    AlModule,
    SchedulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
