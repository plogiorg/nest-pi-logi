import BaseEntity from "src/core/entity/base.entity";
import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import ServiceTypeEntity from "./service.type.entity";


@Entity("services")
export default class ServiceEntity extends BaseEntity {
  @Column({
    name: "user_id",
  })
  userId: string;

  @Column({
    name: "description",
  })
  description: string;

  @Column({
    name: "price",
    type: "float"
  })
  price: number;

  @Column({
    name: "is_deleted",
    type: "boolean"
  })
  isDeleted: boolean;

  @JoinColumn({ name: "service_type_id", })
  @OneToOne(() => ServiceTypeEntity)
  serviceType: ServiceTypeEntity;

  @Column({
    name: "service_type_id",
  })
  serviceTypeId: string;

}
