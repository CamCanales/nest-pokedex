import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

//esta clase, crea reglas minimas para crear un pokemon
export class CreatePokemonDto {

    //isInt, isPositive, min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    // isString, minLenght 1
    @IsString()
    @MinLength(1)
    name: string;
}
