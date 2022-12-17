import { BaseError } from "../BaseError";

export class IdDocenteIdTurma extends BaseError {
    constructor() {
        super('Necessário passar o id do docente e o id da turma.', 401)
    }
}