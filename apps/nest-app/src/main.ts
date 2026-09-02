import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3009;


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // forbidNonWhitelisted: true,
    transform: true,
  }));
  
  const config = new DocumentBuilder()
    .setTitle('Server Monitor API')
    .setDescription('Server Monitor is a powerful API for managing your servers.')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);



  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
