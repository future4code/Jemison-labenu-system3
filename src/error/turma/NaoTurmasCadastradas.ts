import { BaseError } from "../BaseError";

export class NaoTurmasCadastradas extends BaseError {
    constructor() {
        super('Não há turmas cadastradas!', 404)
    }
}