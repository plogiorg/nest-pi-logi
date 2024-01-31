import { Body, Param } from "@nestjs/common";
import { Controller, Get, Patch, Post, Put } from "src/core/decorators";
import {
    CreateServiceRequestDTO,
    CreateServiceTypeRequestDTO, UpdateServiceRequestDTO,
    UpdateStatusRequestDTO,
} from "./dto/request";
import ServiceService from "./service.service";
import {
    CreateServiceTypeResponseDTO,
    GetServiceResponseDTO, GetServicesResponseDTO,
    GetServiceTypesResponseDTO,
    UpdateServiceTypeResponseDTO,
} from "./dto/response";

@Controller({
    group: "Service",
    path: "/service",
    version: "1",
})
export default class ServiceController {
    constructor(private _serviceService: ServiceService) {}

    @Get({
        path: "/types",
        description: "Get all service types",
        model: GetServiceTypesResponseDTO,
    })
    getServiceTypes() {
        // TODO: restrict access to only admin
        return this._serviceService.getServiceTypes();
    }

    @Post({
        path: "/types",
        description: "Create a new Service",
        model: CreateServiceTypeResponseDTO,
    })
    createServiceType(@Body() data: CreateServiceTypeRequestDTO) {
        // TODO: restrict access to only admin
        return this._serviceService.createServiceType(data);
    }

    @Put({
        path: "/types/:id",
        description: "Toggle a service's status",
        model: UpdateServiceTypeResponseDTO,
    })
    updateServiceTypeStatus(@Body() data: UpdateStatusRequestDTO, @Param("id") id: number) {
        // TODO: restrict access to only admin
        return this._serviceService.toggleServiceTypeStatus(id, data);
    }


    @Get({
        path: "/",
        description: "Get all services",
        model: GetServicesResponseDTO,
    })
    getServices() {
        return this._serviceService.getServices();
    }

    @Post({
        path: "/",
        description: "Create a new Service",
        model: GetServiceResponseDTO,
    })
    createService(@Body() data: CreateServiceRequestDTO) {
        return this._serviceService.createService(data);
    }

    @Get({
        path: "/:id",
        description: "get Service",
        model: GetServiceResponseDTO,
    })
    getService( @Param("id") id: number) {
        return this._serviceService.getService(id);
    }

    @Patch({
        path: "/:id",
        description: "Update Service",
        model: GetServiceResponseDTO,
    })
    updateService( @Param("id") id: number, @Body() data: UpdateServiceRequestDTO) {
        return this._serviceService.updateService(id, data);
    }

    @Post({
        path: "/:id",
        description: "Delete Service",
        model: GetServiceResponseDTO,
    })
    deleteService( @Param("id") id: number) {
        return this._serviceService.deleteService(id);
    }




}
