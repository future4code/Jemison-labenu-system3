import { BaseError } from "../BaseError";

export class NaoEstudantesCadastrados extends BaseError {
    constructor() {
        super('Não há estudantes cadastrados', 404)
    }
}