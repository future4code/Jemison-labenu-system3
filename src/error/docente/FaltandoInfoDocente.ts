import { BaseError } from "../BaseError";

export class FaltandoInfoDocente extends BaseError{
    constructor(){
        super('O nome, email, data de nascimento e hobby devem ser passados.', 401)
    }
}