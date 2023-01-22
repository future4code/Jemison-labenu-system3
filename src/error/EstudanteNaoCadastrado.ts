import { BaseError } from "./BaseError";
export class UsuarioNaoCadastrado extends BaseError{
	constructor(){
		super("Usuário não cadastrado", 404)
	}
}