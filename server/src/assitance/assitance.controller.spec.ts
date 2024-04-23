import { Test, TestingModule } from "@nestjs/testing";
import { AssitanceController } from "./assitance.controller";
import { AssitanceService } from "./assitance.service";

describe("AssitanceController", () => {
  let controller: AssitanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssitanceController],
      providers: [AssitanceService],
    }).compile();

    controller = module.get<AssitanceController>(AssitanceController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
