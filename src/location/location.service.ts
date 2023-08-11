import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationRepository } from './repository/location.repository';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(LocationRepository)
        private locationRepository: LocationRepository,
    ) {}

    async getLocationById(site_id: number): Promise<Location> {
        const found = await this.locationRepository.findOne({where: {site_id}});
    
        if (!found) {
            throw new NotFoundException(`Can't find Location with id ${site_id}`);
        }
            
        return found;
    }
}
