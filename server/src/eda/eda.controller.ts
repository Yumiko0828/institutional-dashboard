import { Controller } from "@nestjs/common";
import { EdaService } from "./eda.service";

@Controller("eda")
export class EdaController {
  constructor(private readonly edaService: EdaService) {}
}
