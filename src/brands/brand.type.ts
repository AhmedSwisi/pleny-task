import { Document } from 'mongoose';

export interface BrandDocument extends Document {
  brandName: string;
  yearFounded: number;
  headquarters: string;
  numberOfLocations: number;
}