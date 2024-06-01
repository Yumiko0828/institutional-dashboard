import { IsArray, IsNotEmpty, IsUUID } from "class-validator";

export class CreateAssistanceDto {
  @IsUUID()
  @IsNotEmpty()
  scheduleId: string;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsNotEmpty()
  presents: string[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsNotEmpty()
  lates: string[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsNotEmpty()
  absences: string[];
}
