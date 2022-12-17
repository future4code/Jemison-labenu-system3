import { BaseError } from "../BaseError";

export class IdEstudanteIdTurma extends BaseError {
    constructor() {
        super('Necessário passar o id do estudante e o id da turma.', 401)
    }
}