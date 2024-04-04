import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import ServiceTypeEntity from "./entities/service-type.entity";
import ServiceEntity from "./entities/service.entity";
import { AuthService } from "../auth/auth.service";
import PromoteOrderEntity from "./entities/promote-order.entity";
import { OrderStatus } from "./types/types";
import { PaymentDTO } from "../pi/dto/request";

@Injectable()
export default class OrderService {
    constructor(
        @InjectRepository(ServiceTypeEntity)
        private _serviceTypeEntity: Repository<ServiceTypeEntity>,
        @InjectRepository(PromoteOrderEntity)
        private _promoteOrderRepo: Repository<PromoteOrderEntity>,
        @InjectRepository(ServiceEntity)
        private _serviceEntity: Repository<ServiceEntity>,
        private readonly authService: AuthService
    ) {}

    async incompletePaymentOrder(payment:PaymentDTO, id:number){
        const serviceEntity = await this._serviceEntity.findOne({where: {id}})
        const promoteOrderEntity = await this._promoteOrderRepo.findOne({where: {piPaymentId: payment.identifier}})
        if(promoteOrderEntity){
            //this means that there is a recent order entity with incomplete payment
            serviceEntity.isPromoted = false
        }
        return this._serviceEntity.save(serviceEntity)
    }

    async approvePaymentOrder(paymentId:string, id:number){
        const serviceEntity = await this._serviceEntity.findOne({where: {id}})
        const promoteOrderEntity = new PromoteOrderEntity({
            piPaymentId: paymentId,
            price: 0.1,
            serviceId: serviceEntity.id,
            status: OrderStatus.PENDING,
        })
        return this._promoteOrderRepo.save(promoteOrderEntity)
    }


    async completePaymentOrder(paymentId:string, id:number){
        const serviceEntity = await this._serviceEntity.findOne({where: {id}})
        const promoteOrderEntity = await this._promoteOrderRepo.findOne({where: {piPaymentId: paymentId}})
        if(promoteOrderEntity){
            //this means that there is a recent order entity with complete payment
            promoteOrderEntity.status = OrderStatus.PAID
            serviceEntity.isPromoted = true
        }
        await this._serviceEntity.save(serviceEntity)
        return this._promoteOrderRepo.save(promoteOrderEntity)
    }

    async cancelPaymentOrder(paymentId:string, id:number){
        const serviceEntity = await this._serviceEntity.findOne({where: {id}})
        const promoteOrderEntity = await this._promoteOrderRepo.findOne({where: {piPaymentId: paymentId}})
        if(promoteOrderEntity){
            promoteOrderEntity.status = OrderStatus.FAILED
        }
        return this._promoteOrderRepo.save(promoteOrderEntity)
    }
}
