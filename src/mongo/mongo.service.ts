import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoDBService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db;

  constructor() {
    // Replace with your MongoDB connection string
    this.client = new MongoClient('mongodb://localhost:27017/');
  }

  async onModuleInit() {
    await this.client.connect();
    // Replace 'YOUR_DATABASE_NAME' with your actual database name
    this.db = this.client.db('test');
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async findBrands() {
    const collection = this.db.collection('brands');
    return collection.find({}).toArray();
  }

  async clearFields () {
    await this.db.updateMany({}, {$unset: {"yearsFounded": "", "yearsCreated": "", "yearCreated": "", "hqAddress": ""}})
  }
}