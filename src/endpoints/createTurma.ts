import { Request, Response } from "express";
import { TurmaData } from "../data/TurmaData";
import { FaltaIdModulo } from "../error/turma/FaltaIdModulo";
import { FaltandoInfoTurma } from "../error/turma/FaltandoInfoTurma";
import { ModuloMaiorSeis } from "../error/turma/ModuloMaiorSeis";
import { NaoTurmasCadastradas } from "../error/turma/NaoTurmasCadastradas";
import { Turma } from "../model/Turma";

export class CreateTurma {

    async createTurma(req: Request, res: Response) {
        try {
            const { name, modulo } = req.body

            if (!name || !modulo) {
                throw new FaltandoInfoTurma()
            }
            if (modulo > 6) {
                throw new ModuloMaiorSeis()
            }

            const id = Date.now().toString()
            const newId = id.toString()
            const newTurma = new Turma(newId, name, modulo)

            const turma = new TurmaData()
            await turma.insertTurma(newTurma)

            res.status(201).send('Turma criada com sucesso')

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    async getTurma(req: Request, res: Response) {
        try {
            const turmaData = new TurmaData()
            const turmas = await turmaData.selectTurma()

            if (!turmas.length) {
                throw new NaoTurmasCadastradas()
            }

            res.status(200).send(turmas)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    async putTurmaModulo(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { modulo } = req.body

            if (!id || !modulo) {
                throw new FaltaIdModulo()
            }

            const moduloData = new TurmaData()
            await moduloData.editModulo(id, modulo)

            res.status(200).send("Módulo alterado!")

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })

        }
    }
}