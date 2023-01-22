import { BaseError } from "./BaseError";
export class ModuloNaoPermitido extends BaseError{
	constructor(){
		super("O módulo só pode ser entre 1 e 6", 401)
	}
}