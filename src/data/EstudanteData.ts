import { Estudante } from "../model/Estudante";
import { BaseDataBase } from "./BaseDataBase";

export class EstudanteData extends BaseDataBase{

	async criarEstudante(estudante: Estudante){
		await this.getConnection().insert({
			id:estudante.getId(),
			nome:estudante.getNome(),
			email:estudante.getEmail(),
			data_nascimento:estudante.getDataNascimento(),
			turma_id:estudante.getIdTurma(),
		}).into("estudante")

		return `Estudante com nome :'${estudante.getNome()}' criado com sucesso`
	}

	async buscaEstudantePorEmail(email: string){

		const result = await this.getConnection()
		.select("*")
		.from("estudante")
		.where({ email })

		return result[0]
	}

	async buscarEstudantePorNome(nome:string):Promise<Estudante | undefined>{
		const result = await this.getConnection()
		.select("*")
		.from("estudante")
		.where({ nome })

		if(!result.length){
			return undefined
		}

		return new Estudante(result[0].nome, result[0].email, result[0].data_nascimento, result[0].turma_id, result[0].id)

	}

	async buscarEstudantePorId(id: string):Promise<Estudante | undefined>{
		const result = await this.getConnection()
		.select("*")
		.from("estudante")
		.where({ id })

		if(!result.length){
			return undefined
		}

		return new Estudante(result[0].nome, result[0].email, result[0].data_nascimento, result[0].turma_id, result[0].id)

	}
	async mudarEstudanteTurma(id:string, turmaId:string):Promise<string>{
		await this.getConnection()
		.update({ turma_id: turmaId })
		.into("estudante")
		.where({ id: id })

		return `estudante com id ${id} atualizado para a turma ${turmaId}`
	}
}