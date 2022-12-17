export class Usuario {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private date_nasc: Date,
        private turma_id?: string
        )
        {}

        getId() {
            return this.id
        }
        getName() {
            return this.name
        }
        getEmail() {
            return this.email
        }
        getDate_nasc() {
            return this.date_nasc
        }
        getTurma_id() {
            return this.turma_id
        }
        setTurma_id(turma_id: string) {
            this.turma_id = turma_id
        }
}