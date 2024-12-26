import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase(); //PASA EL NOMBRE A MINUSCULA!!!

    try{
      //inserta datos en tableplus
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    }catch(error){

      this.HandleExceptions(error);

    }    
  }


  findAll() { 


    return `This action returns all pokemon`;
  }

  //asyncrono porque busca info a la BD
  async findOne(term: string) {

    let pokemon: Pokemon;

    //"+term" convierto el term a numero
    //si esto es un numero 
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no: term})
    }

    //verificar por MongoId
    if(!pokemon && isValidObjectId(term)){
      //si el "term" es un mongoId, buscamos el pokemon mediante id
      pokemon = await this.pokemonModel.findById(term);
    }

    //verificar por name
    if( ! pokemon){
      //si el pokemon no se encuentra por id, buscaremos por nombre
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim()})
    }

    //manejo de errores
    if(!pokemon) throw new NotFoundException(`Pokemon with id, name or no ${term} not found`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    //si pasa esta linea, es porque encontró un pokemon 
    const pokemon = await this.findOne(term);

    //validamos que el pokemon a actualizar tenga nombre y lo pasamos a lowercase
    if(updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase()


    try{
      //actualizamos el pokemon y especificamos con el "{new:true}" que nos devuelva el nuevo pokemon al momento de actualizar
      await pokemon.updateOne(updatePokemonDto);
  
      //devolvemos el pokemon y sus propiedades, y le sobreescribimos las propiedades con el "updatePokemonDto"
      return {...pokemon.toJSON(), ...updatePokemonDto};
    }
    catch(error){

      this.HandleExceptions(error);
    }

  }

  async remove(id: string) {
    //---------------------------------------------
    //validamos si el pokemon existe
    //const pokemon = await this.findOne(id);

    //retorna un status 200 que eliminó el pokemon
    //await pokemon.deleteOne();
    //---------------------------------------------

    //desestructuramos la cantidad de registros eliminados mediante el id 
    const {deletedCount, acknowledged} = await this.pokemonModel.deleteOne( {id: id});

    //si no encontró registros eliminados dispara exception
    if(deletedCount ===0){
      throw new BadRequestException(`Pokemon with id "${id} not found`)
    }
    return;

  }

  //creamos un método reutilizable que permite manejar errores de cualquier tipo (tipado any)
  private HandleExceptions(error: any){
    //error 11000 = ya hay un registro con ese valor
    if(error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create pokemon - Chek server logs`)
  }
}
