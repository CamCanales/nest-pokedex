import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


//se extiende de Document "Mongoose" para poder trabajarlo como documento en MongoDb
@Schema()
export class Pokemon extends Document {
    
    @Prop({
        unique:true,
        index: true,
    })
    name: string;

    @Prop({
        unique:true,
        index: true,
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);




