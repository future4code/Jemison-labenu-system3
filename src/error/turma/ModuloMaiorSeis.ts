import { BaseError } from "../BaseError";

export class ModuloMaiorSeis extends BaseError {
    constructor() {
        super('O modulo dever ser um número e ter o valor de 1 a 6.', 401)
    }
}