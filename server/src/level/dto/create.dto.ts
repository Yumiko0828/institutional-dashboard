import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateLevelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}
