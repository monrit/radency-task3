import { Module } from "@nestjs/common";
import { NotesModule } from "./notes/notes.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { Note } from "./notes/models/notes.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
        }),
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Note],
            autoLoadModels: true,
        }),
        NotesModule,
    ],
})
export class AppModule {}
