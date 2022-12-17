export class Turma {
    constructor(
        private id: string, 
        private name: string, 
        private modulo: string)
    {}

    getId() {
        return this.id
    }
    getName(){
        return this.name
    }
    getModulo(){
        return this.modulo
    }
    setModulo(modulo: string) {
        this.modulo = modulo
    }
}

