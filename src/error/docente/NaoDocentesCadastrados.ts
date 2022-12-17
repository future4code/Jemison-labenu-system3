import { BaseError } from "../BaseError";

export class NaoDocentesCadastrados extends BaseError {
    constructor() {
        super('Não há docentes cadastrados', 404)
    }
}