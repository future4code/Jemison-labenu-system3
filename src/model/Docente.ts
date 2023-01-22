import { Usuario } from "./Usuario";
export class Docente extends Usuario{
  constructor(nome:string, email:string, dataNascimento:string, idTurma:string, id:string){
        super(nome, email, dataNascimento, idTurma, id)
  }
}