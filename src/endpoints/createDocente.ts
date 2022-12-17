import { Request, Response } from "express";
import { DocenteData } from "../data/DocenteData";
import { EmailJaCadastrado } from "../error/EmailJaCadastrado";
import { EspecialidadeNaoExiste } from "../error/docente/EspecialidadeNaoExiste";
import { FaltandoInfoDocente } from "../error/docente/FaltandoInfoDocente";
import { IdDocenteIdTurma } from "../error/docente/IdDocenteIdTurma";
import { NaoDocentesCadastrados } from "../error/docente/NaoDocentesCadastrados";
import { Docente } from "../model/Docente";

export class CreateDocente{
    async createDocente(req: Request, res: Response) {
        try {
            const { name, email, date_nasc, turma_id, especialidade_id } = req.body
            if (!name || !email || !date_nasc) {
                throw new FaltandoInfoDocente()
            }

            const id = Date.now().toString()
            const newId = id.toString()

            const idDocente = Date.now().toString()
            const newIdDocente = idDocente.toString()

            const new_date = date_nasc.split("/")
            const deadlineInReverse = new_date.reverse()
            const deadlineForAmerican = deadlineInReverse.join("/")


            const docenteData = new DocenteData()
            const docente = await docenteData.selectDocentes()
            const verificaEmailExiste = docente.find((doce: any) => doce.email === email)

            if (verificaEmailExiste) {
                throw new EmailJaCadastrado()
            }

            const newDocente = new Docente(newIdDocente, name, email, deadlineForAmerican, turma_id, especialidade_id)

            const result = await docenteData.selectEspecialidade()
            const findEspecialidade = await result.find((resu: any) => resu.id === especialidade_id)

            if (findEspecialidade) {
                await docenteData.insertDocente(newDocente)
                await docenteData.insertDocente_Especialidade(newId, newIdDocente, findEspecialidade.id)
            } else {
                throw new EspecialidadeNaoExiste()
            }

            res.status(200).send("Docente criado")

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message || "Erro do servidor" })
        }
    }

    async getDocente(req: Request, res: Response) {
        try {

            const docenteData = new DocenteData()
            const docente = await docenteData.selectDocentes()

            if (!docente.length) {
                throw new NaoDocentesCadastrados()
            }

            res.status(200).send(docente)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    async putTurmaDocente(req: Request, res: Response) {
        try {
            const id = req.params.id
            const turma_id = req.body.turma_id

            if (!id || !turma_id) {
                throw new IdDocenteIdTurma()
            }

            const docenteData = new DocenteData()
            await docenteData.editTurmaDocente(id, turma_id)
            res.status(200).send("Turma Alterada")
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })

        }
    }
}