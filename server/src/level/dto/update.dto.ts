import { PartialType } from "@nestjs/mapped-types";
import { CreateLevelDto } from "./create.dto";

export class UpdateLevelDto extends PartialType(CreateLevelDto) {}
