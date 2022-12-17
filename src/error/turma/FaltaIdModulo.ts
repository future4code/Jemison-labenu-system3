import { BaseError } from "../BaseError";

export class FaltaIdModulo extends BaseError {
    constructor() {
        super('O novo módulo e o id devem ser informados!', 401)
    }
}