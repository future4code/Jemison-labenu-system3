import { Usuario } from "./Usuario";

export class Estudante extends Usuario {
    constructor(
        id: string,
        name: string,
        email: string,
        date_nasc: Date,
        private hobby_name: string,
        private hobby_id?: string,
        turma_id?: string,
    ) {
        super(id, name, email, date_nasc, turma_id)
    }
    getHobby_name() {
        return this.hobby_name
    }
    getHobby_id() {
        return this.hobby_id
    }
}