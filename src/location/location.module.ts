import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { LocationRepository } from './repository/location.repository';

@Module({
  // imports: [
  //   TypeOrmModule.forFeature([LocationRepository])
  // ],
  controllers: [LocationController],
  providers: [
    LocationService,
    LocationRepository,
  ]
})
export class LocationModule {}
