import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';

@Controller('location')
export class LocationController {
    constructor(private locationService: LocationService) {}

    @Get('/:id')
    getLocationById(@Param('id') id: number): Promise<Location> {
        return this.locationService.getLocationById(id);
    }
}
