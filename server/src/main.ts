import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cors = require('cors');
  const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  }
  app.use(cors(corsOptions));

  const config = new DocumentBuilder()
    .setTitle('Knowledge Test Fullstack PMN API')
    .setDescription('This project comes with a full-fledged API. You can find the documentation on all provided endpoints here!')
    .setVersion('0.9b')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  await app.listen(8000);
}
bootstrap();
