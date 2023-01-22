export class Estudante {
  private id:string | undefined 
  private nome:string 
  private email:string 
  private dataNascimento:string
  private idTurma:string

  constructor(nome:string, email:string, dataNascimento:string, idTurma:string, id?:string) {
      this.nome = nome
      this.email = email
      this.dataNascimento = dataNascimento
      this.idTurma = idTurma
      this.id = id
  }

  public getId(){
      return this.id
  }

  public getNome(){
      return this.nome
  }
  public getEmail(){
    return this.email
}
public getDataNascimento(){
  return this.dataNascimento
}
public getIdTurma(){
  return this.idTurma
}

}

