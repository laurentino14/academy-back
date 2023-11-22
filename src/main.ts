import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Bodyworks')
    .setDescription(
      'Bodyworks API explanation </br> </br> <b>Author:</b> <i>Vinicius Leprevost</i> </br> </br> When authenticating to the application, in all requests the "<b><i> authorization </i></b>" header will be sent! </br> Remember this when implementing the api somewhere, as you will have to implement it manually in the request.',
    )
    .setVersion('1.0')
    .addBearerAuth({
      in: 'header',
      type: 'http',
      name: 'Authorization',
      description: 'Bearer token',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
      persistAuthorization: true,
    },
    customSiteTitle: 'Bodyworks API - Swagger',
  });
  await app.listen(3000);
}
bootstrap();
