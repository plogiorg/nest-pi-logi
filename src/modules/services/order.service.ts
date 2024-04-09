import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import ServiceTypeEntity from "./entities/service-type.entity";
import ServiceEntity from "./entities/service.entity";
import PromoteOrderEntity from "./entities/promote-order.entity";
import { OrderStatus } from "./types/types";
import { PaymentDTO } from "../pi/dto/request";
import { PiService } from "../pi/pi.service";

@Injectable()
export default class OrderService {

    private readonly logger = new Logger(OrderService.name);

    constructor(
        @InjectRepository(ServiceTypeEntity)
        private _serviceTypeEntity: Repository<ServiceTypeEntity>,
        @InjectRepository(PromoteOrderEntity)
        private _promoteOrderRepo: Repository<PromoteOrderEntity>,
        @InjectRepository(ServiceEntity)
        private _serviceEntity: Repository<ServiceEntity>,
        private readonly _piService: PiService
    ) {}

    async incompletePaymentOrder(payment:PaymentDTO){
        const { serviceId } = payment.metadata;
        const promoteOrderEntity = await this._promoteOrderRepo.findOne({where: {piPaymentId: payment.identifier}})

        console.log({promoteOrderEntity});
        console.log({serviceId});

        if(promoteOrderEntity){
            //this means that there is a recent order entity with incomplete payment
            const serviceEntity = await this._serviceEntity.findOne({where: {id: promoteOrderEntity.serviceId}})
            serviceEntity.isPromoted = false
            await this._serviceEntity.save(serviceEntity)
            return this._piService.incompleteTransaction(payment, promoteOrderEntity)
        }
        return null
    }

    async approvePaymentOrder(paymentId:string){
        const paymentDTOAxiosResponse = await this._piService.getPayment(paymentId);
        const currentPayment = paymentDTOAxiosResponse.data
        const { serviceId } = currentPayment.metadata;

        const promoteOrderEntity = new PromoteOrderEntity({
            piPaymentId: paymentId,
            price: 0.1,
            status: OrderStatus.PENDING,
            serviceId,
        })
        await this._piService.approvePayment(paymentId);
        this.logger.log(`Approved the payment ${paymentId}`)
        return promoteOrderEntity;
    }


    async completePaymentOrder(paymentId:string, transactionId:string){
        const promoteOrderEntity = await this._promoteOrderRepo.findOne({where: {piPaymentId: paymentId}})
        const serviceEntity = await this._serviceEntity.findOne({where: {id: promoteOrderEntity.serviceId}})
        if(promoteOrderEntity){
            //this means that there is a recent order entity with complete payment
            promoteOrderEntity.status = OrderStatus.PAID
            promoteOrderEntity.transactionId = transactionId
            serviceEntity.isPromoted = true
        }

        // let Pi server know that the payment is completed
        await this._piService.completePayment(paymentId, transactionId);
        this.logger.log(`Completed the payment ${paymentId}` )

        await this._serviceEntity.save(serviceEntity)
        return this._promoteOrderRepo.save(promoteOrderEntity)
    }

    async cancelPaymentOrder(paymentId:string){
        const promoteOrderEntity = await this._promoteOrderRepo.findOne({where: {piPaymentId: paymentId}})
        if(promoteOrderEntity){
            promoteOrderEntity.status = OrderStatus.FAILED
        }
        return this._promoteOrderRepo.save(promoteOrderEntity)
    }
}
