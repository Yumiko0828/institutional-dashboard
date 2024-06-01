import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateGradeDto {
  @IsInt()
  @IsNotEmpty()
  label: number;

  @IsString()
  @IsNotEmpty()
  section: string;

  @IsString()
  @IsNotEmpty()
  academicLevelId: string;
}
