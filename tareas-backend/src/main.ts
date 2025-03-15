import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS (antes de iniciar el servidor)
  app.enableCors({
    origin: ['http://localhost:4200', 'https://prueba-tareas-vdw4.vercel.app'], // Agrega el dominio de producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Si usas cookies o auth con credenciales
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();