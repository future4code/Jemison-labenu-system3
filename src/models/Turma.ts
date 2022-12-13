export class Turma {    
    private id: string 
    private nome: string
    private modulo: string 
    
    constructor(nome: string, id: string, modulo: string){
        this.nome = nome  
        this.id = id
        this.modulo = modulo     
    }
    getIdTurma(){
        return this.id
    }

    getNome(){
        return this.nome
    }   
    getModulo(){
        return this.modulo
    }   
}
export default Turma