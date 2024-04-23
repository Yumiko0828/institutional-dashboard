import { Controller } from "@nestjs/common";
import { AssitanceService } from "./assitance.service";

@Controller("assitance")
export class AssitanceController {
  constructor(private readonly assitanceService: AssitanceService) {}
}
