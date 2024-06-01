import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { StudentDto } from "./student.dto";

export class RegisterStudentsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @Type(() => StudentDto)
  data: StudentDto[];
}
