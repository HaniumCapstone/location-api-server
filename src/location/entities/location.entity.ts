import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('historic_site')
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn()
    site_id: number;

    @Column('int')
    character_id: number;

    @Column('varchar', { length: 255 })
    site_name: string;

    @Column('varchar', { length: 255 })
    site_link: string;

    @Column('text')
    site_description: string;

    @Column('decimal', { precision: 9, scale: 6 })
    longitude: number;

    @Column('decimal', { precision: 9, scale: 6 })
    latitude: number;
}