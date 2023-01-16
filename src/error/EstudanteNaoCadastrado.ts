import { BaseError } from "./BaseError";

export class EstudanteNaoCadastrado extends BaseError{
	constructor(){
		super("Usuário não cadastrado", 404)
	}
}