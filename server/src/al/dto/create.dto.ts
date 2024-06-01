import { IsNotEmpty, IsString } from "class-validator";

export class CreateAlDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
