import { PartialType } from "@nestjs/mapped-types";
import { CreateGradeDto } from "./create.dto";

export class UpdateGradeDto extends PartialType(CreateGradeDto) {}
