import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middlewares/logger.middleware';
import 'reflect-metadata';
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { ProductsSeed } from './seeds/products/products.seed';
import { log } from 'console';
import { SeedModule } from './seeds/seeds.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.use(LoggerGlobal)
  const categoriesSeed = app.select(SeedModule).get(CategoriesSeed);
  await categoriesSeed.seed();

  console.log("La insercion de categorias ha terminado");
  
  const productSeed = app.select(SeedModule).get(ProductsSeed);
  await productSeed.seed();

  console.log("La insercion de productos ha terminado");

  await app.listen(3000);
  
}
bootstrap();
