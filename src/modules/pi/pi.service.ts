import axios, { AxiosInstance } from "axios";
import CONFIG from "../../config";
import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { PaymentDTO } from "./dto/request";
import ServiceService from "../services/service.service";
import { BadRequestException, NotFoundException } from "../../core/exceptions";
import { HttpService } from "@nestjs/axios";
import { OrderStatus } from "../services/types/types";


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
    return this.axiosInstance.get("/", { headers: { 'Authorization': `Bearer ${accessToken}` }})
  }

  async incompleteTransaction(paymentData:PaymentDTO){

    const txid = paymentData.transaction.txid;
    const txURL = paymentData.transaction._link;
    const order = await this._serviceService.getOrderByPaymentId(paymentData.identifier)

    if(!order){
      throw new NotFoundException("no order found")
    }

    const horizonResponse = await this.httpService.axiosRef.get(txURL, { timeout: 2000 })

    if (horizonResponse.data.memo !== order.piPaymentId) {
      throw new BadRequestException("Payment id doesn't match.")
    }


    await this._serviceService.updateOrderByPaymentId(paymentData.identifier, OrderStatus.PAID)

    await this.axiosInstance.post(`/v2/payments/${paymentData.transaction}/complete`, { txid });

    return { message: `Handled the incomplete payment ${paymentData.identifier}` }

  }

}