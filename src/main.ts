import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const start = async () => {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    );
    const options = new DocumentBuilder()
        .setTitle("My Notes App")
        .setDescription("Api for notes interaction")
        .setVersion("1.0.0")
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api/docs", app, document);

    await app.listen(PORT, "0.0.0.0", () => console.log(`Server started on port ${PORT}`));
};

start();
