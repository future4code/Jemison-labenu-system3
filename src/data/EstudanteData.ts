import { Estudante } from "../model/Estudante";
import BaseDataBase from "./baseDateBase";

export class EstudanteData extends BaseDataBase {

    async insertEstudante(estudante: Estudante): Promise<void> {
        await this.getConnection()
            .insert({
                id: estudante.getId(),
                name: estudante.getName(),
                email: estudante.getEmail(),
                date_nasc: estudante.getDate_nasc(),

            })
            .into("LabenuSystem_Estudante")

    }

    async selectEstudanteName(name: string): Promise<Estudante[]> {
        const result = await this.getConnection()
            .select("*")
            .where("name", "LIKE", `%${name}%`)
            .from("LabenuSystem_Estudante")
        return result
    }

    async selectAllEstudante(): Promise<Estudante[]> {
        const result = await this.getConnection()
            .select("*")
            .from("LabenuSystem_Estudante")
        return result
    }

    async insertHobby(newIdHobby: string, hobby_name: string): Promise<void> {
        await this.getConnection()
            .insert({
                id: newIdHobby,
                name: hobby_name
            })
            .into("LabenuSystem_Hobby")

    }

    async insertEstudante_Hobby(id: string, estudante_id: string, hobby_id: string): Promise<void> {
        await this.getConnection()
            .insert({
                id: id,
                estudante_id: estudante_id,
                hobby_id: hobby_id
            })
            .into("LabenuSystem_Estudante_Hobby")
    }

    async selectHobby(): Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT LabenuSystem_Hobby.id as hobby_id, LabenuSystem_Hobby.name as hobby_name, LabenuSystem_Estudante.id as estudante_id
            FROM LabenuSystem_Estudante_Hobby 
            JOIN LabenuSystem_Estudante 
            ON LabenuSystem_Estudante_Hobby.estudante_id = LabenuSystem_Estudante.id
            JOIN LabenuSystem_Hobby 
            ON LabenuSystem_Estudante_Hobby.hobby_id = LabenuSystem_Hobby.id
        `)
        return result[0]
    }

    async editTurmaEstudante(estudante_id: string, turma_id: string): Promise<void> {
        await this.getConnection()
            .update({
                turma_id: turma_id
            })
            .into("LabenuSystem_Estudante")
            .where("id", estudante_id)
    }

    async addTurmaEstudante(id: string, turma_id: string): Promise<void> {
        await this.getConnection().raw(`
            update LabenuSystem_Estudante set turma_id = ${turma_id}
            where id = ${id}
        `)
    }

    
}
