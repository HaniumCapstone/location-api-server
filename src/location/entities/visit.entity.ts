import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('visit')
export class Visit extends BaseEntity {
    @PrimaryGeneratedColumn()
    visit_id: number;

    @Column('bigint')
    uid: number;
    
    @Column('varchar', { length: 255 })
    site_name: string

    @Column('date')
    visit_date: Date;

    @Column('int')
    site_id: number;
}