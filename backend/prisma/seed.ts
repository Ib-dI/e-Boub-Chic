import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Nettoie les données existantes (optionnel)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // =====================
  // Crée les Catégories
  // =====================
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Vêtements',
        slug: 'vetements',
        description: 'Tous nos vêtements tendance',
        image: `https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8diVDMyVBQXRlbWVudHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500`,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Accessoires',
        slug: 'accessoires',
        description: 'Accessoires de mode et de style',
        image: `https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNjZXNzb2lyZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500`,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Chaussures',
        slug: 'chaussures',
        description: 'Chaussures confortables et élégantes',
        image: `https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774`,
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // =====================
  // Crée les Produits
  // =====================
  const products = await Promise.all([
    // Vêtements
    prisma.product.create({
      data: {
        name: 'T-Shirt Classique Blanc',
        slug: 'tshirt-classique-blanc',
        description: 'T-shirt intemporel en coton 100% confortable',
        price: 29.99,
        stock: 50,
        sku: 'TSHIRT-001',
        image: `https://images.unsplash.com/photo-1713881604560-085594ed2c3d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=500`,
        images: [
          `https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500`,
        ],
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Robe Été Fleurie',
        slug: 'robe-ete-fleurie',
        description: "Robe légère parfaite pour l'été",
        price: 59.99,
        stock: 30,
        sku: 'ROBE-001',
        image: `https://images.unsplash.com/flagged/photo-1585052201332-b8c0ce30972f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9iZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500`,
        images: [
          `https://images.unsplash.com/photo-1623609163859-ca93c959b98a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cm9iZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500`,
        ],
        categoryId: categories[0].id,
      },
    }),
    // Accessoires
    prisma.product.create({
      data: {
        name: 'Sac à Main Cuir',
        slug: 'sac-main-cuir',
        description: 'Sac élégant en cuir véritable',
        price: 89.99,
        stock: 15,
        sku: 'SAC-001',
        image: `https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2FjfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500`,
        images: [
          `https://images.unsplash.com/photo-1614179689702-355944cd0918?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FjfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500`,
        ],
        categoryId: categories[1].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Montre Élégante',
        slug: 'montre-elegante',
        description: 'Montre intemporelle avec bracelet en acier',
        price: 149.99,
        stock: 20,
        sku: 'WATCH-001',
        image: `https://images.unsplash.com/photo-1612817159576-986a0b7a4165?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9udHJlJTIwJUMzJUE5bCVDMyVBOWdhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500`,
        images: [
          `https://images.unsplash.com/photo-1760163180940-eecde9eda36c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vbnRyZSUyMCVDMyVBOWwlQzMlQTlnYW50fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500`,
        ],
        categoryId: categories[1].id,
      },
    }),
    // Chaussures
    prisma.product.create({
      data: {
        name: 'Baskets Confortables',
        slug: 'baskets-confortables',
        description: 'Baskets blanches modernes et confortables',
        price: 79.99,
        stock: 40,
        sku: 'SHOES-001',
        image: `https://images.unsplash.com/photo-1608667508764-33cf0726b13a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFza2V0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500`,
        images: [
          `https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFza2V0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500`,
        ],
        categoryId: categories[2].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Talons Élégants',
        slug: 'talons-elegants',
        description: 'Talons hauts noirs pour les occasions spéciales',
        price: 99.99,
        stock: 25,
        sku: 'SHOES-002',
        image: `https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFsb25zfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500`,
        images: [
          `https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGFsb25zfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500`,
        ],
        categoryId: categories[2].id,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // =====================
  // Crée un Utilisateur de Test
  // =====================
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashed_password_here', // À remplacer par du vrai hashing plus tard
    },
  });

  console.log(`✅ Created user: ${user.email}`);

  console.log('🎉 Seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
