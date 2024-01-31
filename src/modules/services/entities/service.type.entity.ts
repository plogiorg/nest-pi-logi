import BaseEntity from "src/core/entity/base.entity";
import { Column, Entity, Index } from "typeorm";


@Entity("services_types")
export default class ServiceTypeEntity extends BaseEntity {
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
