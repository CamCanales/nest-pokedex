import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  //@HttpCode(200) //---> permite personalizar los códigos de error
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {


    return this.pokemonService.update(term, updatePokemonDto);
  }

  //al ocupar el pipe "ParseMongoIdPipe", transforma la data
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
