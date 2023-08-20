import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { CertVisitDto } from './dto/cert-visit.dto';
import { Visit } from './entities/visit.entity';

@Controller('location')
export class LocationController {
    constructor(private locationService: LocationService) {}

    @Get()
    getAllLocation(): Promise<Location[]> {
        return this.locationService.getAllLocation();
    }

    @Get('/:id')
    getLocationById(@Param('id') id: number): Promise<Location> {
        return this.locationService.getLocationById(id);
    }

    @Get('/character/:id')
    getLocationByCharacter(@Param('id') id: number): Promise<Location[]> {
        return this.locationService.getLocationByCharacter(id);
    }

    @Post('/visit')
    certVisit(@Req() req: Request, @Body() certVisitDto: CertVisitDto): Promise<Visit> {
        const authorization = req.headers['authorization'];
        
        return this.locationService.certVisit(authorization, certVisitDto);
    }
}

