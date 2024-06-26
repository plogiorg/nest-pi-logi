import { Body, Param, Query, Request, UseGuards } from "@nestjs/common";
import { Controller, Get, Patch, Post, Put } from "src/core/decorators";
import {
  CompletePaymentRequestDTO,
  CreateServiceRequestDTO,
  CreateServiceTypeRequestDTO, GetServiceParams, PaymentRequestDTO, UpdateServiceRequestDTO,
} from "./dto/request";
import ServiceService from "./service.service";
import {
    CreateServiceTypeResponseDTO,
    GetServiceResponseDTO, GetServicesResponseDTO,
    GetServiceTypesResponseDTO,
    UpdateServiceTypeResponseDTO,
} from "./dto/response";
import { UserInfoResponse } from "../auth/types/AuthTypes";
import { AuthGuard } from "../../core/guards/auth.guard";
import { PaymentDTO } from "../pi/dto/request";
import OrderService from "./order.service";

@Controller({
    group: "Service",
    path: "/service",
    version: "1",
})
export default class ServiceController {
    constructor(private _serviceService: ServiceService, private _orderService: OrderService) {}

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
        description: "Create a new Service Type",
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
    updateServiceTypeStatus(@Body() data: CreateServiceTypeRequestDTO, @Param("id") id: number) {
        // TODO: restrict access to only admin
        return this._serviceService.updateServiceType(id, data);
    }


    @Get({
        path: "/",
        description: "Get all services",
        model: GetServicesResponseDTO,
    })
    getServices(@Query() params: GetServiceParams) {
        return this._serviceService.getServices(params);
    }

    @Post({
        path: "/",
        description: "Create a new Service",
        model: GetServiceResponseDTO,
    })
    @UseGuards(AuthGuard)
    createService(@Body() data: CreateServiceRequestDTO, @Request() req: Request & {user:UserInfoResponse}) {
      console.log({req});
        return this._serviceService.createService(data, req.user?.sub || req.user?.uid);
    }

  @Get({
    path: "/provider/services",
    description: "get Provider Services",
    model: GetServiceResponseDTO,
  })
  @UseGuards(AuthGuard)
  getProviderServices(@Request() req: Request & {user:UserInfoResponse}) {
    return this._serviceService.getProviderServices(req.user?.uid || req.user?.sub);
  }


  @Get({
        path: "/:id",
        description: "get Service",
        model: GetServiceResponseDTO,
    })
    getService(@Param("id") id: number) {
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
    deleteService(@Param("id") id: number) {
        return this._serviceService.deleteService(id);
    }


  @Post({
    path: "/order/payment/cancel",
    description: "cancel Service Payment Order",
    model: GetServiceResponseDTO,
  })
  cancelPaymentOrder(@Body() data: PaymentRequestDTO) {
    return this._orderService.cancelPaymentOrder(data.paymentId);
  }

  @Post({
    path: "/order/payment/approve",
    description: "approve Service Payment Order",
    model: GetServiceResponseDTO,
  })
  approvePaymentOrder(@Body() data: PaymentRequestDTO) {
    return this._orderService.approvePaymentOrder(data.paymentId);
  }

  @Post({
    path: "/order/payment/complete",
    description: "complete Service Payment Order",
    model: GetServiceResponseDTO,
  })
  completePaymentOrder(@Body() data:CompletePaymentRequestDTO) {
    return this._orderService.completePaymentOrder(data.paymentId, data.transactionId);
  }

  @Post({
    path: "/order/payment/incomplete",
    description: "incomplete Service Payment Order handling",
    model: GetServiceResponseDTO,
  })
  incompletePaymentOrder(@Body() payment: PaymentDTO) {
    console.log({payment});
    return this._orderService.incompletePaymentOrder(payment);
  }
}
