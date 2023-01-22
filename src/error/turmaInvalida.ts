import { BaseError } from "./BaseError";
export class turmaInvalida extends BaseError{
	constructor(){
		super("Id da turma não encontrado", 404)
	}
}