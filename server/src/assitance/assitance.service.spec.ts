import { Test, TestingModule } from "@nestjs/testing";
import { AssitanceService } from "./assitance.service";

describe("AssitanceService", () => {
  let service: AssitanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssitanceService],
    }).compile();

    service = module.get<AssitanceService>(AssitanceService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
