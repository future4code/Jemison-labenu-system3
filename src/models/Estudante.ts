export class Estudantes{
    private id: string
    private nome: string
    private email: string
    private dataNascimento: string
    private turmaId: string

    constructor(nome: string, email: string, dataNascimento: string, turmaId: string, id: string){
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.turmaId = turmaId;
        this.id = id
    }

    getIdEstudante(){
        return this.id
    }

    getNome(){
        return this.nome
    }

    getEmail(){
        return this.email
    }

    getDataNascimento(){
        return this.dataNascimento
    }

    getIdTurma(){
        return this.turmaId
    }
}

export default Estudantes