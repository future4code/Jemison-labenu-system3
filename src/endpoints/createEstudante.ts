import { Request, Response } from "express";
import { EstudanteData } from "../data/EstudanteData";
import { EmailJaCadastrado } from "../error/EmailJaCadastrado";
import { FaltandoInfoEstudante } from "../error/estudante/FaltandoInfoEstudante";
import { IdEstudanteIdTurma } from "../error/estudante/IdEstudanteIdTurma";
import { NaoEstudantesCadastrados } from "../error/estudante/NaoEstudantesCadastrados";
import { Estudante } from "../model/Estudante";

export class CreateEstudante {

    async createEstudante(req: Request, res: Response) {
        try {
            const { name, email, date_nasc, hobby_name } = req.body

            if (!name || !email || !date_nasc || !hobby_name) {
                throw new FaltandoInfoEstudante()
            }

            const id = Date.now().toString()
            const newId = id.toString()

            const idEstudante = Date.now().toString()
            const newIdEstudante = idEstudante.toString()

            const idHobby = Date.now().toString()
            const newIdHobby = idHobby.toString()

            const new_date = date_nasc.split("/")
            const deadlineInReverse = new_date.reverse()
            const deadlineForAmerican = deadlineInReverse.join("/")

            const estudanteData = new EstudanteData()
            const estudantes = await estudanteData.selectAllEstudante()
            const verificaEmailExiste = estudantes.find((estu: any) => estu.email === email)

            if (verificaEmailExiste) {
                throw new EmailJaCadastrado()
            }

            const newEstudante = new Estudante(newIdEstudante, name, email, deadlineForAmerican, hobby_name)

            const result = await estudanteData.selectHobby()
            const findName = await result.find((resu: any) => resu.hobby_name === hobby_name)

            if (findName) {
                await estudanteData.insertEstudante(newEstudante)
                await estudanteData.insertEstudante_Hobby(newId, newIdEstudante, findName.hobby_id)

            } else {
                await estudanteData.insertHobby(newIdHobby, hobby_name)
                await estudanteData.insertEstudante(newEstudante)
                await estudanteData.insertEstudante_Hobby(newId, newIdEstudante, newIdHobby)
            }

            res.status(201).send('Estudante criado')

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    async getEstudanteName(req: Request, res: Response) {
        try {

            const estudanteData = new EstudanteData()
            let name = req.query.name as string || ""

            const estudante = await estudanteData.selectEstudanteName(name)

            if (!estudante.length) {
                throw new NaoEstudantesCadastrados()
            }

            res.status(200).send(estudante)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    async postTurmaEstudante(req: Request, res: Response) {
        try {
            const id = req.params.id
            const turma_id = req.body.turma_id

            if (!id || !turma_id) {
                throw new IdEstudanteIdTurma()
            }

            const estudanteData = new EstudanteData()
            await estudanteData.addTurmaEstudante(id, turma_id)

            res.status(200).send("Turma alterada!")

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }
}