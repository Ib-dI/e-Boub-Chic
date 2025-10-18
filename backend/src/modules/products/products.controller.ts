import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with pagination' })
  @ApiQuery({ name: 'skip', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'take', required: false, type: Number, example: 10 })
  findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.productsService.findAll(
      parseInt(skip ?? '0'),
      parseInt(take ?? '10'),
    );
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products by name, description or SKU' })
  @ApiQuery({ name: 'q', required: true, type: String, example: 'tshirt' })
  @ApiQuery({ name: 'skip', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'take', required: false, type: Number, example: 10 })
  search(
    @Query('q') query: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.productsService.search(
      query,
      parseInt(skip ?? '0'),
      parseInt(take ?? '10'),
    );
  }

  @Get('category/:categorySlug')
  @ApiOperation({ summary: 'Get products by category' })
  @ApiQuery({ name: 'skip', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'take', required: false, type: Number, example: 10 })
  findByCategory(
    @Param('categorySlug') categorySlug: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.productsService.findByCategory(
      categorySlug,
      parseInt(skip ?? '0'),
      parseInt(take ?? '10'),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID or slug' })
  findOne(@Param('id') id: string) {
    // Essaie par slug d'abord, puis par ID
    return this.productsService.findBySlug(id).then((product) => {
      if (product) return product;
      return this.productsService.findOne(id);
    });
  }
}
