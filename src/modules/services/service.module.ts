import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ServiceTypeEntity from "./entities/service-type.entity";
import ServiceService from "./service.service";
import ServiceController from "./service.controller";
import ServiceEntity from "./entities/service.entity";
import { AuthModule } from "../auth/auth.module";
import PromoteOrderEntity from "./entities/promote-order.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ServiceTypeEntity, ServiceEntity, PromoteOrderEntity]), AuthModule],
    exports: [ServiceService],
    providers: [ServiceService],
    controllers: [ServiceController],
})
export default class ServiceModule {}
