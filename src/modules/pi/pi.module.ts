import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from "@nestjs/common";
import { PiService } from "./pi.service";
import ServiceModule from "../services/service.module";


@Module({
  imports: [HttpModule, forwardRef(() => ServiceModule)],
  controllers: [],
  providers: [PiService],
  exports: [PiService]
})
export class PiModule {}
