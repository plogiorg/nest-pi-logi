import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "src/core/exceptions";
import { In, Repository } from "typeorm";
import {
    CreateServiceRequestDTO,
    CreateServiceTypeRequestDTO, UpdateServiceRequestDTO,
    UpdateStatusRequestDTO,
} from "./dto/request";
import {
    CreateServiceTypeResponseDTO, GetServiceResponseDTO, GetServicesResponseDTO,
    GetServiceTypesResponseDTO, ServiceResponse, ServiceTypeResponse,
    UpdateServiceTypeResponseDTO,

} from "./dto/response";
import ServiceTypeEntity from "./entities/service.type.entity";
import ServiceEntity from "./entities/service.entity";

@Injectable()
export default class ServiceService {
    constructor(
        @InjectRepository(ServiceTypeEntity)
        private _serviceTypeEntity: Repository<ServiceTypeEntity>,
        @InjectRepository(ServiceEntity)
        private _serviceEntity: Repository<ServiceEntity>
    ) {}

    async createService(data: CreateServiceRequestDTO){
        const serviceTypeEntity = await this._serviceTypeEntity.findOneOrFail({where: {id:data.serviceTypeId}});
        const service = new ServiceEntity()
        Object.assign(service, data)
        return this._serviceEntity.save(service)
    }

    async getService(serviceId: number):Promise<GetServiceResponseDTO>{
        const serviceEntity = await this._serviceEntity.findOneOrFail({where: {id:serviceId}});
        const serviceResponse  = new ServiceResponse()
        return {service: Object.assign(serviceResponse, serviceEntity)}
    }

    async updateService(serviceId:number, data: UpdateServiceRequestDTO):Promise<ServiceResponse>{
        const serviceEntity = await this._serviceEntity.findOneOrFail({where: {id:serviceId}});
        const updatedService = Object.assign(serviceEntity, data)
        await this._serviceEntity.save(updatedService)
        const serviceResponse  = new ServiceResponse()
        return Object.assign(serviceResponse,  updatedService)
    }

    async deleteService(serviceId: number):Promise<{success:boolean}>{
        const serviceEntity = await this._serviceEntity.findOneOrFail({where: {id:serviceId}});
        serviceEntity.isDeleted = true
        await this._serviceEntity.save(serviceEntity)
        return {success:true}
    }

    async getServices(): Promise<GetServicesResponseDTO> {
        const services = await this._serviceEntity.find();
        return { services };
    }


    async getServiceTypes(): Promise<GetServiceTypesResponseDTO> {
        const services = await this._serviceTypeEntity.find();
        return { services };
    }


    async createServiceType(
        data: CreateServiceTypeRequestDTO
    ): Promise<CreateServiceTypeResponseDTO> {
        const service = new ServiceTypeEntity();
        Object.assign(service, data)
        await this._serviceTypeEntity.save(service);
        return { service };
    }

    async toggleServiceTypeStatus(
        id: number,
        data: UpdateStatusRequestDTO
    ): Promise<UpdateServiceTypeResponseDTO> {
        const service = await this._serviceTypeEntity.findOne({ where: { id } });
        if (!service) {
            throw new NotFoundException("Service not found");
        }
        service.isActive = data.isActive;
        await this._serviceTypeEntity.save(service);
        return { service };
    }
}
