import BaseEntity from "src/core/entity/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import ServiceTypeEntity from "./service-type.entity";


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
    type: "boolean",
    default: false
  })
  isDeleted: boolean;

  @Column({
    name: "is_promoted",
    type: "boolean",
    default: false
  })
  isPromoted: boolean;

  @JoinColumn({ name: "service_type_id" })
  @ManyToOne(() => ServiceTypeEntity)
  serviceType: ServiceTypeEntity;

  @Column({
    name: "service_type_id",
  })
  serviceTypeId: string;

  // @Column({
  //   name: "longitude",
  //   type: "double precision",
  //   default: 0
  // })
  // lan:number
  //
  // @Column({
  //   name: "latitude",
  //   type: "double precision",
  //   default: 0
  // })
  // lat: number
  //
  // @Column({
  //   name: "city",
  //   nullable: true
  // })
  // city: string

  @Column({
    name: "country",
    nullable: true
  })
  country: string

}
