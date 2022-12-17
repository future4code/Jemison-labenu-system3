import { Usuario } from "./Usuario";


export class Docente extends Usuario {
    constructor(
        id: string,
        name: string,
        email: string,
        date_nasc: Date,
        turma_id: string,
        private especialidade_id: string
    ) {
        super(id, name, email, date_nasc, turma_id)
    }
  
    getEspecialidadeId() {
        return this.especialidade_id
    }
}