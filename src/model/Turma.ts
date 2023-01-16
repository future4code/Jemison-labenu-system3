export class Turma {
    private id:string | undefined = Date.now().toString()
    private nome:string | undefined
    private modulo:string | undefined

    constructor(nome:string, id?:string, modulo?:string){
        this.nome = nome
        this.id = id
        this.modulo = modulo
    }

    public getId(){
        return this.id
    }

    public getNome(){
        return this.nome
    }
}

