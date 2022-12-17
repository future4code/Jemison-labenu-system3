import { BaseError } from "../BaseError";

export class EspecialidadeNaoExiste extends BaseError{
    constructor(){
        super('Especialidade não existe', 404)
    }
}