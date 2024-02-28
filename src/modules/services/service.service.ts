import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "src/core/exceptions";
import { In, Repository } from "typeorm";
import {
    CreateServiceRequestDTO,
    CreateServiceTypeRequestDTO, GetServiceParams, UpdateServiceRequestDTO,
    UpdateStatusRequestDTO,
} from "./dto/request";
import {
    CreateServiceTypeResponseDTO, GetServiceResponseDTO, GetServiceRsesponseDTO, GetServicesResponseDTO,
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

    async createService(data: CreateServiceRequestDTO, userId:string){
        const serviceTypeEntity = await this._serviceTypeEntity.findOneOrFail({where: {id:data.serviceTypeId}});
        const service = new ServiceEntity()
        service.serviceType = serviceTypeEntity
        Object.assign(service, { ...data, userId })
        return this._serviceEntity.save(service)
    }

    async getService(serviceId: number):Promise<GetServiceResponseDTO>{
        const serviceEntity = await this._serviceEntity.findOneOrFail({where: {id:serviceId}});
        const serviceResponse  = new ServiceResponse()
        return {service: Object.assign(serviceResponse, serviceEntity)}
    }

    async getProviderServices(providerId: string):Promise<GetServiceRsesponseDTO>{
        console.log({providerId});
        const serviceEntity = await this._serviceEntity.find({where: {userId:providerId}});
        const serviceResponse  = []
        return {services: Object.assign(serviceResponse, serviceEntity)}
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

    async getServices(params: GetServiceParams): Promise<GetServicesResponseDTO> {
        let query = this._serviceEntity.createQueryBuilder('service')

        query = query.leftJoinAndSelect('service.serviceType', 'serviceType');


        // Apply filtering based on provided parameters
        if (params.city) {
            query = query.where('service.city = :city', { city: params.city });
        }

        if (params.priceFrom && params.priceTo) {
            query = query.andWhere('service.price BETWEEN :priceFrom AND :priceTo', {
                priceFrom: params.priceFrom,
                priceTo: params.priceTo,
            });
        }

        if (params.search) {
            query = query.andWhere(
              '(service.city LIKE :search OR service.description LIKE :search)',
              { search: `%${params.search}%` },
            );
        }

        // Apply sorting based on the `sortBy` parameter, if provided
        if (params.sortBy) {
            query = query.orderBy(`service.${params.sortBy}`);
        }

        // Fetch services based on the constructed query
        const services = await query.getMany();
        return { services };
    }


    async getServiceTypes(): Promise<GetServiceTypesResponseDTO> {
        const types = await this._serviceTypeEntity.find();
        return { types };
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
