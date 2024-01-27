import { Body, Param, Query } from "@nestjs/common";
import { Controller, Get, Post, Put } from "src/core/decorators";
import {
    CreateServiceRequestDTO,
    UpdateStatusRequestDTO,
} from "./dto/request";
import ServiceService from "./service.service";
import {CreateServiceResponseDTO, GetServicesResponseDTO, UpdateServiceResponseDTO} from "./dto/response";

@Controller({
    group: "Service",
    path: "/service",
    version: "1",
})
export default class ServiceController {
    constructor(private _serviceService: ServiceService) {}

    @Get({
        path: "/",
        description: "Get all services",
        model: GetServicesResponseDTO,
    })
    getTodos() {
        return this._serviceService.getServices();
    }

    @Post({
        path: "/",
        description: "Create a new Service",
        model: CreateServiceResponseDTO,
    })
    createTodo(@Body() data: CreateServiceRequestDTO) {
        return this._serviceService.createService(data);
    }

    @Put({
        path: "/:id",
        description: "Toggle a service's status",
        model: UpdateServiceResponseDTO,
    })
    updateTodo(@Body() data: UpdateStatusRequestDTO, @Param("id") id: number) {
        return this._serviceService.toggleServiceStatus(id, data);
    }
}
