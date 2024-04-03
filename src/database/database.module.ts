import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, brandSchema } from 'src/schemas/brands-schema';
import { MongoDBService } from 'src/database/database.service'


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    MongooseModule.forFeature([{ name: "brands", schema: brandSchema }]),
  ],
  providers: [
    MongoDBService
  ]
})

export class DatabaseModule {}