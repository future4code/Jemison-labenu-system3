import { BaseError } from "../BaseError";

export class FaltandoInfoTurma extends BaseError {
    constructor() {
        super('O nome  e o módulo deve ser passado.', 401)
    }
}