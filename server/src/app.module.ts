import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { StudentsModule } from "./students/students.module";
import { GradeModule } from "./grade/grade.module";
import { LevelModule } from "./level/level.module";
import { EdaModule } from "./eda/eda.module";
import { AssitanceModule } from "./assitance/assitance.module";
import { ConfigModule } from "@nestjs/config";
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
    LevelModule,
    EdaModule,
    AssitanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
