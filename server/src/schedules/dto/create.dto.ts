import { IsInt, IsNotEmpty, IsUUID } from "class-validator";

export class CreateScheduleDto {
  @IsInt()
  @IsNotEmpty()
  lea: number;

  @IsUUID()
  @IsNotEmpty()
  gradeId: string;
}
