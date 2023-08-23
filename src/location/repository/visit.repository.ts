import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Visit } from "../entities/visit.entity";
import { CertVisitDto } from "../dto/cert-visit.dto";

@Injectable()
export class VisitRepository extends Repository<Visit> {
    constructor(dataSource: DataSource) {
        super(Visit, dataSource.createEntityManager());
    }

    async certVisit(uid: number, CertVisitDto: CertVisitDto): Promise<Visit> {
        const {site_id, site_name, visit_date} = CertVisitDto;

        const visit = this.create({
            uid,
            site_id,
            site_name,
            visit_date
        })

        await this.save(visit);
        return visit;
    }
}
