import { Controller, Put, Body, Param ,Post} from '@nestjs/common';
import { BrandsService } from './brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.brandsService.updateBrand(id, updateData);
  }

  @Post()
  create(@Body() createBrandDto: any) {
    return this.brandsService.addBrand(createBrandDto);
  }

  @Post('correct-data')
  async correctBrandsData() {
    await this.brandsService.editAndValidateBrands();
    return { message: 'Brands data correction process completed.' };
  }

  
}