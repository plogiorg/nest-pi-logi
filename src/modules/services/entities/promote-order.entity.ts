import BaseEntity from "src/core/entity/base.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import ServiceEntity from "./service.entity";
import { OrderStatus } from "../types/types";



@Entity("promote_orders")
export default class PromoteOrderEntity extends BaseEntity {
  @Column({
    name: "pi_payment_id",
  })
  piPaymentId: string;

  @Column({
    name: "service_id",
  })
  serviceId: string;


  @JoinColumn({ name: "service_id" })
  @ManyToOne(() => ServiceEntity)
  service: ServiceEntity;


  @Column({
    name: "status",
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status: OrderStatus;


  @Column({
    name: "price",
    type: "float"
  })
  price: number;

}
