import { BaseError } from "./BaseError";

export class EmailJaCadastrado extends BaseError{
	constructor(){
		super("O e-mail enviado, já esta cadastrado", 401)
	}
}