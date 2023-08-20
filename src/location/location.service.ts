import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationRepository } from './repository/location.repository';
import { Location } from './entities/location.entity';
import { AuthVisitDto } from './dto/auth-visit.dto';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(LocationRepository)
        private locationRepository: LocationRepository,
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
}
