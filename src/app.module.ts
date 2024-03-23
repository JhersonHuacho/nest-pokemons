import { join } from 'path'; // viene en Node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { AppSetting } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppSetting],
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    //MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: 'pokemonsdb',
    }),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {
  // constructor() {
  //   console.log(process.env);
  // }
}
