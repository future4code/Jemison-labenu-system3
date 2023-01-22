import { BaseError } from "./BaseError";
export class FaltandoInfo extends BaseError{
	constructor(){
		super("Está faltando alguns parâmetros", 404)
	}
}