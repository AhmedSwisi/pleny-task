// src/mongodb/mongodb.module.ts
import { Module, Global } from '@nestjs/common';
import { MongoDBService } from 'src/database/database.service';
@Global()
@Module({
  providers: [
    {
      provide: MongoDBService,
      useFactory: () => {
        return new MongoDBService();
      },
    },
  ],
  exports: [MongoDBService],
})
export class MongoDBModule {}
