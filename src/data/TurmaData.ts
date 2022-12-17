import { Turma } from "../model/Turma";
import BaseDataBase from "./baseDateBase";

export class TurmaData extends BaseDataBase {

    async insertTurma(turma: Turma): Promise<void> {
        await this.getConnection()
            .insert({
                id: turma.getId(),
                name: turma.getName(),
                modulo: turma.getModulo()
            })
            .into("LabenuSystem_Turma")
    }

    async selectTurma(): Promise<Turma[]> {
        const result = await this.getConnection()
            .select("*")
            .from("LabenuSystem_Turma")

        return result
    }

    async editModulo(id: string, modulo: string): Promise<void> {
        await this.getConnection()
            .update({
                modulo: modulo
            })
            .into("LabenuSystem_Turma")
            .where("id", id)
    }
}