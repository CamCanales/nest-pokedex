import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';


@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  //al ser un pipe, transforma la data
  transform(value: any, metadata: ArgumentMetadata) {

    //console.log({value, metadata})

    if(!isValidObjectId(value)){
      throw new BadRequestException(`${value} is not a valid MongoID`)
    }

    return value;
  }
}
