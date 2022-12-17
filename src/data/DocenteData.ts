import { Docente } from "../model/Docente";
import BaseDataBase from "./baseDateBase";

export class DocenteData extends BaseDataBase {
    async insertDocente(docente: Docente): Promise<void> {
        await this.getConnection()
            .insert({
                id: docente.getId(),
                name: docente.getName(),
                email: docente.getEmail(),
                date_nasc: docente.getDate_nasc(),
                turma_id: docente.getTurma_id(),
            })
            .into("LabenuSystem_Docente")
    }

    async insertDocente_Especialidade(id: string, docente_id: string, especialidade_id: string): Promise<void> {
        await this.getConnection()
            .insert({
                id: id,
                docente_id: docente_id,
                especialidade_id: especialidade_id
            })
            .into("LabenuSystem_Docente_Especialidade")
    }

    async selectDocentes(): Promise<Docente[]> {
        const result = await this.getConnection()
            .select("*")
            .from("LabenuSystem_Docente")
        return result
    }

    async selectEspecialidade(): Promise<any[]> {
        const result = await this.getConnection()
            .select("id")
            .from("LabenuSystem_Especialidade")

        return result
    }

    async editTurmaDocente(id: string, turma_id: string): Promise<void> {
        await this.getConnection().raw(`
            update LabenuSystem_Docente set turma_id = ${turma_id}
            where id = ${id}
        `)
    }
}