import { Test, TestingModule } from "@nestjs/testing";
import { EdaController } from "./eda.controller";
import { EdaService } from "./eda.service";

describe("EdaController", () => {
  let controller: EdaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EdaController],
      providers: [EdaService],
    }).compile();

    controller = module.get<EdaController>(EdaController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
