import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { LocationRepository } from './repository/location.repository';
import { VisitRepository } from './repository/visit.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location])
  ],
  controllers: [LocationController],
  providers: [
    LocationService,
    JwtService,
    LocationRepository,
    VisitRepository,
  ]
})
export class LocationModule {}
