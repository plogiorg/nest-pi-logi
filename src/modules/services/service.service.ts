import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "src/core/exceptions";
import { In, Repository } from "typeorm";
import {
    CreateServiceRequestDTO,
    UpdateStatusRequestDTO,
} from "./dto/request";
import {
    CreateServiceResponseDTO,
     GetServicesResponseDTO,
     UpdateServiceResponseDTO,

} from "./dto/response";
import ServiceEntity from "./service.entity";

@Injectable()
export default class ServiceService {
    constructor(
        @InjectRepository(ServiceEntity)
        private _serviceEntity: Repository<ServiceEntity>
    ) {}

    async getServices(): Promise<GetServicesResponseDTO> {
        const services = await this._serviceEntity.find();
        return { services };
    }

    async createService(
        data: CreateServiceRequestDTO
    ): Promise<CreateServiceResponseDTO> {
        const service = new ServiceEntity();
        Object.assign(service, data)
        await this._serviceEntity.save(service);
        return { service };
    }

    async toggleServiceStatus(
        id: number,
        data: UpdateStatusRequestDTO
    ): Promise<UpdateServiceResponseDTO> {
        const service = await this._serviceEntity.findOne({ where: { id } });
        if (!service) {
            throw new NotFoundException("Service not found");
        }
        service.isActive = data.isActive;
        await this._serviceEntity.save(service);
        return { service };
    }
}
