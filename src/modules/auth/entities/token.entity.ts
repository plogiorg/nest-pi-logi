import { Column, Entity } from "typeorm";
import BaseEntity from "../../../core/entity/base.entity";
import { UserType } from "../types/AuthTypes";


@Entity("tokens")
export default class TokenEntity extends BaseEntity {
  @Column({name: "access_token"})
  access_token:string;

  @Column({name: "username"})
  username:string;

  @Column({name: "user_id"})
  userId:string;

  @Column({name: "user_type", type: "enum", enum: UserType, default: UserType.PROVIDER})
  userType:UserType;
}
