import axios, { AxiosInstance, AxiosResponse } from "axios";
import CONFIG from "../../config";
import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { PaymentDTO } from "./dto/request";
import ServiceService from "../services/service.service";
import { BadRequestException, NotFoundException } from "../../core/exceptions";
import { HttpService } from "@nestjs/axios";
import { OrderStatus } from "../services/types/types";
import PromoteOrderEntity from "../services/entities/promote-order.entity";


@Injectable()
export class PiService {
  private readonly logger = new Logger(PiService.name);
  private readonly axiosInstance:AxiosInstance


  constructor(@Inject(forwardRef(() => ServiceService)) private _serviceService: ServiceService, private readonly httpService: HttpService) {
    this.axiosInstance = axios.create({
      baseURL: CONFIG.PI.BASE_URL,
      timeout: 20000,
      headers: { 'Authorization': `Key ${CONFIG.PI.API_KEY}` }
    });

  }

  async getUserInfo(accessToken: string): Promise<any> {
    return this.axiosInstance.get("/v2/me", { headers: { 'Authorization': `Bearer ${accessToken}` }})
  }

  async getPayment(paymentId:string): Promise<AxiosResponse<PaymentDTO>>{
    return await this.axiosInstance.get(`/v2/payments/${paymentId}`);
  }

  async completePayment(paymentId:string, txid:string): Promise<AxiosResponse<PaymentDTO>>{
    return await this.axiosInstance.post(`/v2/payments/${paymentId}/complete`, { txid });
  }

  async approvePayment(paymentId:string): Promise<AxiosResponse<PaymentDTO>>{
    return await this.axiosInstance.post(`/v2/payments/${paymentId}/approve`);
  }

  async incompleteTransaction(paymentData:PaymentDTO, order?: PromoteOrderEntity){
    const txid = paymentData.transaction.txid;
    const txURL = paymentData.transaction._link;

    // const horizonResponse = await this.httpService.axiosRef.get(txURL, { timeout: 2000 })
    // if (horizonResponse.data.memo !== order.piPaymentId) {
    //   throw new BadRequestException("Payment id doesn't match.")
    // }

    // await this._serviceService.updateOrderByPaymentId(paymentData.identifier, OrderStatus.PAID)
    await this.axiosInstance.post(`/v2/payments/${txid}/complete`, { txid });

    return { message: `Handled the incomplete payment ${paymentData.identifier}` }

  }

}