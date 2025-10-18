import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Récupère TOUS les produits avec pagination
  async findAll(skip: number = 0, take: number = 10) {
    const products = await this.prisma.product.findMany({
      skip,
      take,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.prisma.product.count();

    return {
      data: products,
      total,
      skip,
      take,
    };
  }

  // Récupère les produits d'une catégorie
  async findByCategory(
    categorySlug: string,
    skip: number = 0,
    take: number = 10,
  ) {
    const category = await this.prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!category) {
      return { data: [], total: 0, skip, take };
    }

    const products = await this.prisma.product.findMany({
      where: {
        categoryId: category.id,
      },
      skip,
      take,
      include: {
        category: true,
      },
    });

    const total = await this.prisma.product.count({
      where: { categoryId: category.id },
    });

    return {
      data: products,
      total,
      skip,
      take,
    };
  }

  // Récupère UN produit par son ID ou son slug
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    return product;
  }

  // Recherche par slug (pour les URLs amicales)
  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    return product;
  }

  // Cherche des produits par texte
  async search(query: string, skip: number = 0, take: number = 10) {
    const products = await this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { sku: { contains: query, mode: 'insensitive' } },
        ],
      },
      skip,
      take,
      include: {
        category: true,
      },
    });

    const total = await this.prisma.product.count({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { sku: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    return {
      data: products,
      total,
      skip,
      take,
      query,
    };
  }
}
