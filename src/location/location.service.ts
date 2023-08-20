import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

        // 거리 계산
        const site_id: number = certVisitDto['site_id'];
        const location = await this.locationRepository.findOne({where: {site_id}});

        const location_lon: number = location['longitude'];
        const location_lat: number = location['latitude'];
        const user_lon: number = certVisitDto['user_lon'];
        const user_lat: number = certVisitDto['user_lat'];

        const location_rad_lat: number = Math.PI * location_lat / 180;
        const user_rad_lat: number = Math.PI * user_lat / 180;
        const theta: number = location_lon - user_lon;
        const rad_theta: number = Math.PI * theta / 180;
        let dist: number = Math.sin(location_rad_lat) * Math.sin(user_rad_lat) + Math.cos(location_rad_lat) * Math.cos(user_rad_lat) * Math.cos(rad_theta);
        if (dist > 1) { 
            dist = 1;
        }

        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515 * 1.609344 * 1000;
        if (dist < 100) {
            dist = Math.round(dist / 10) * 10;
        } else {
            dist = Math.round(dist / 100) * 100;
        }

        if (dist > 500) {
              throw new BadRequestException(`The user is more than 500 meters away.`);
        }

        return this.visitRepository.certVisit(uid, certVisitDto);
    }

    async getVisit(accessToken: string): Promise<Visit[]> {
        const token = accessToken.replace("Bearer ", "");
        const decoded = this.jwtService.decode(token);

        const uid = Number(decoded['uid']);

        return await this.visitRepository.find({where: {uid}});
    }

}
