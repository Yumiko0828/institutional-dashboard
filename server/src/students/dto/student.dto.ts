import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class StudentDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsUUID()
  @IsNotEmpty()
  gradeId: string;
}
