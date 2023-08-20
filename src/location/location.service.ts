import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationRepository } from './repository/location.repository';
import { Location } from './entities/location.entity';
import { CertVisitDto } from './dto/cert-visit.dto';
import { Visit } from './entities/visit.entity';
import { VisitRepository } from './repository/visit.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(LocationRepository)
        private locationRepository: LocationRepository,

        @InjectRepository(VisitRepository)
        private visitRepository: VisitRepository,

        private jwtService: JwtService
    ) {}

    async getAllLocation(): Promise<Location[]> {
        return await this.locationRepository.find();
    }

    async getLocationById(site_id: number): Promise<Location> {
        const found = await this.locationRepository.findOne({where: {site_id}});
    
        if (!found) {
            throw new NotFoundException(`Can't find Location with id ${site_id}`);
        }
            
        return found;
    }

    async getLocationByCharacter(character_id: number): Promise<Location[]> {
        return await this.locationRepository.find({where: {character_id}});
    }

    async certVisit(accessToken: string, certVisitDto: CertVisitDto): Promise<Visit> {
        const token = accessToken.replace("Bearer ", "");
        const decoded = this.jwtService.decode(token);

        const uid = Number(decoded['uid']);

        return this.visitRepository.certVisit(uid, certVisitDto);
    }

}
