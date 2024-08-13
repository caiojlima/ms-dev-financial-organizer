import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Financial Organizer')
    .setDescription('Serviço de Controle de Carteira e Finanças')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Wallet')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
