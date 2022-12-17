import { BaseError } from "./BaseError";

export class EmailJaCadastrado extends BaseError {
    constructor() {
        super('Erro, email já cadastrado!', 401)
    }
}