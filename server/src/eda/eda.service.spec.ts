import { Test, TestingModule } from "@nestjs/testing";
import { EdaService } from "./eda.service";

describe("EdaService", () => {
  let service: EdaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EdaService],
    }).compile();

    service = module.get<EdaService>(EdaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
