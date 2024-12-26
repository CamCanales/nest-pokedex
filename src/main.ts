import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //señala un prefijo a nuestro backend, para llamar a los endpoint como "localhost:3000/api/endopoint"
  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
    })
  )

  await app.listen(process.env.PORT ?? 3010);
}
bootstrap();
 