import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

/*
  indicamos el path, del archivo statico que cargará el server en la ruta raiz

   ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..', 'public'),
    })

*/

@Module({
  imports: [

    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..', 'public'),
    }),

    //especificar el url de la bd levantada en docker !
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

    PokemonModule,

    CommonModule 

  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
