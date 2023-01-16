import { Docente } from "../model/Docente";
import { BaseDataBase } from "./BaseDataBase";

export class DocenteData extends BaseDataBase{
	async criarDocente(docente: Docente){

		await this.getConnection().insert({
			id:docente.getId(),
			nome:docente.getNome(),
			email:docente.getEmail(),
			data_nascimento:docente.getDataNascimento(),
			turma_id:docente.getIdTurma(),
		}).into("docente")

		return `Docente com nome :'${docente.getNome()}' criado com sucesso`
	}
	async buscarDocentePorEmail(email: string){
		const result = await this.getConnection()
			.select("*")
			.from("docente")
			.where({ email })

			return result[0]
	}
	async buscarDocentes():Promise<Docente[]>{
		const result = await this.getConnection()
		.select("*")
		.from("docente")

		const docenteTipado = result.map((docente)=>{
			return new Docente(docente.nome, docente.email, docente.data_nascimento, docente.turma_id, docente.id)
		})

		return docenteTipado
	}
	async buscarDocentePorId(id:string):Promise<Docente | undefined>{
		const result = await this.getConnection()
		.select("*")
		.from("estudante")
		.where({ id })

		if(!result.length){
			return undefined
		}
		return new Docente(result[0].nome, result[0].email, result[0].data_nascimento, result[0].turma_id, result[0].id)
	}

	async mudarDocenteTurma(id:string, turmaId:string):Promise<string>{
		await this.getConnection()
		.update({ turma_id: turmaId })
		.into("docente")
		.where({ id: id })

		return `Docente com id ${id} atualizado para a turma ${turmaId}`
	}
}