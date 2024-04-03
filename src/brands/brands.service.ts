import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BrandDocument } from './brand.type';
import { Brand } from 'src/schemas/brands-schema';
import { Model } from 'mongoose';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BrandEditDto } from './brands.dto';
import { MongoDBService } from '../database/database.service';

function safeParseYear(year: any, minYear = 1600, maxYear = new Date().getFullYear()) {
  let parsedYear = parseInt(year);
  if (isNaN(parsedYear)) {
    parsedYear = maxYear; // Default to current year if parsing fails
  }
  return Math.min(maxYear, Math.max(minYear, parsedYear));
}

function correctYearFounded(brand) {
  // Assuming yearCreated is always correct and available
  const correctedYear = parseInt(brand.yearCreated);
  console.log(correctedYear, "year")
  brand.yearFounded = isNaN(correctedYear) ? new Date().getFullYear() : correctedYear;
}

const isParsable = (n) => {
  return !isNaN(parseInt(n)) && isFinite(n)
}

const getYear = (yearFounded, yearCreated, yearsFounded) => {

  if (isParsable(yearCreated)) {
    return parseInt(yearCreated)
  } else {
    if (isParsable(yearFounded)) {
      return parseInt(yearFounded)
    } else if (isParsable(yearsFounded)) {
      return parseInt(yearsFounded)
    } else {
      return 1600
    }
  }
}

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.collection.name) private brandModel: Model<BrandDocument>,
    private mongoDBService: MongoDBService
  ) {}

  async updateBrand(id: string, updateData: any): Promise<BrandDocument> {
    const updatedBrand = await this.brandModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    return updatedBrand;
  }

  async editAndValidateBrands(): Promise<void> {
    const brands = await this.brandModel.find().exec();
    const newArr = []

    const rawData = await this.mongoDBService.findBrands()

    for (const data of rawData) {
      let brandName = data?.brandName
      let yearFounded = data?.yearFounded
      let numberofLocations = data?.numberOfLocations
      let headquarters = data?.headquarters
      const hqAddress = data?.hqAddress
      const brand = data?.brand

      const brandObj = await this.brandModel.findOne({ 
        _id: data?._id
       }).exec()
      
      if (headquarters === undefined) {
        if (hqAddress) {
          if (typeof hqAddress === 'string') {
            headquarters = hqAddress
          }
        }
      } else {
        if (typeof headquarters === 'string') {
          headquarters = headquarters
        } else {
          headquarters = ""
        }
      }

      if (isParsable(numberofLocations)) {
          numberofLocations = numberofLocations
      } 
      else {
        numberofLocations = 1
      }

      if (brandName === undefined) {
        if (brand) {
          if (typeof brand === 'string') {
            brandName = brand
          } else if (brand instanceof Object) {
            brandName = brand?.name
          }
        }
      }

      console.log("yearFounded: ", yearFounded)
      console.log("brandName: ", brandName)
      console.log("number of locations: ", numberofLocations)
      console.log("hq: ", headquarters)
      console.log("**************************************")

      brandObj.yearFounded = getYear(data?.yearFounded, data?.yearCreated, data?.yearsFounded)      
      brandObj.brandName = brandName
      brandObj.numberOfLocations = numberofLocations
      brandObj.headquarters = headquarters

      await this.brandModel.findByIdAndUpdate(data?._id, brandObj).exec()
      // await brandObj.save()
      // brandObj.yearFounded = yearFounded
      
      
      // Edit the brand data here if needed to match your schema
      // For example, ensure yearFounded is a number and not in the future
      // brand.yearFounded = safeParseYear(brand.yearFounded);
   
      // correctYearFounded(brand)
      
      // // Convert and validate
      // const brandDto = plainToInstance(BrandEditDto, brandObj.toObject(), { excludeExtraneousValues: true });
      // const errors = await validate(brandDto);

      // if (errors.length > 0) {
      //   // Handle validation errors, e.g., log them or throw an exception
      //   //console.error(errors);
      // } else {
      //   // If the brand passes validation, update it in the database

      //   // await this.brandModel.findByIdAndUpdate(brand._id, brandDto).exec();
      // }
    }

    await this.mongoDBService.clearFields()
  }
  
  async addBrand(createBrandDto: any): Promise<BrandDocument> {
    const newBrand = new this.brandModel(createBrandDto);
    return await newBrand.save();
  }
}