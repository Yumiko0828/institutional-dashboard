import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateGradeDto {
  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  section: string;

  @IsString()
  @IsNotEmpty()
  levelId: string;
}
