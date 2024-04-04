import BaseEntity from "src/core/entity/base.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import ServiceEntity from "./service.entity";
import { OrderStatus } from "../types/types";



@Entity("promote_orders")
export default class PromoteOrderEntity extends BaseEntity {

  constructor(dto?: Partial<PromoteOrderEntity>) {
    super();
    Object.assign(this, dto);
  }


  @Column({
    name: "pi_payment_id",
  })
  piPaymentId: string;

  @Column({
    name: "service_id",
  })
  serviceId: number;


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
