import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, brandSchema } from 'src/schemas/brands-schema';
import { MongoDBModule } from 'src/mongo/mongo.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Brand.collection.name, schema: brandSchema },]),MongoDBModule],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}