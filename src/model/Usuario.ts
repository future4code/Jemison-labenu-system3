export abstract class Usuario {
    private id:string 
    private nome:string
    private email:string
    private dataNascimento:string
    private idTurma:string

    constructor(nome:string, email:string, dataNascimento:string, idTurma:string, id:string){
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.idTurma = idTurma;
        this.id = id
    }
    getId(){
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
        return this.idTurma
    }
}
