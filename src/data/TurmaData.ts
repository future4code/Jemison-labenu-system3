import { Turma } from "../model/Turma";
import { BaseDataBase } from "./BaseDataBase";

export class TurmaData extends BaseDataBase{

	async criarTurma(turma:Turma):Promise<string>{

		await this.getConnection().insert({
			id:turma.getId(),
			nome:turma.getNome()
		}).into("turma")
		return `turma ${turma.getNome()} criada com sucesso`
	}
	async selecionarTurmasAtivas(): Promise<Turma[]>{
		const result = await this.getConnection().select("*").from("turma").where("modulo", ">", 0)
		const todasTurmas = result.map((turma)=>{
			return new Turma(turma.nome, turma.id, turma.modulo)
		})

		return todasTurmas
	}

	async mudarModulo(id:string, modulo:number):Promise<string>{
		await this.getConnection().update({modulo})
		.into("turma")
		.where({id})

		return `O modulo foi alterado com sucesso!`
	}
	async buscarTurmaPeloId(id:string){
		const result = await this.getConnection()
		.select("*")
		.from("turma")
		.where({id})

		return result
	}
}