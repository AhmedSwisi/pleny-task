// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { UserController } from './users/user.controller';
import { UserService } from './users/users.service';
import { UserSchema } from './schemas/user.schema';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [DatabaseModule,BrandsModule, MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
