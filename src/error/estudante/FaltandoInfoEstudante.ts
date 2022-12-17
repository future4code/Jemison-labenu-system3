import { BaseError } from "../BaseError";

export class FaltandoInfoEstudante extends BaseError {
    constructor() {
        super('O nome, email, data de nascimento e hobby devem ser passados.', 401)
    }
}