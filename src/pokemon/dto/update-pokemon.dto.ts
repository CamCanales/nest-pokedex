import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';


//esta clase, extiende de forma parcial desde la clase "createPokemonDto", la cual define las reglas minimas para crear un pokemon y en este caso las extiende para actualizar la data
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
