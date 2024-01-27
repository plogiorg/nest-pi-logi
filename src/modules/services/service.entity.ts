import BaseEntity from "src/core/entity/base.entity";
import { Column, Entity, Index } from "typeorm";


@Entity("services")
export default class ServiceEntity extends BaseEntity {
    @Column({
        name: "title",
    })
    title: string;

    @Column({
        name: "description",
    })
    description: string;

    @Column({
        name: "image",
    })
    image: string;

    @Column({
        name: "is_active",
        type: "boolean",
        default: true,
    })
    isActive: boolean;
}
