import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('historic_site')
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn()
    site_id: number;

    @Column()
    character_id: number;

    @Column()
    site_name: string;

    @Column()
    site_link: string;

    @Column()
    site_description: string;

    @Column()
    longitude: number;

    @Column()
    latitude: number;
}