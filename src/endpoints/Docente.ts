import { Request, Response } from "express";
import { DocenteData } from "../data/DocenteData";
import { TurmaData } from "../data/TurmaData";

import { EmailJaCadastrado } from "../error/EmailJaCadastrado";
import { FaltandoInfo } from "../error/FaltandoInfo";
import { turmaInvalida } from "../error/turmaInvalida";
import moment from "moment";
import { Docente } from "../model/Docente";
import { UsuarioNaoCadastrado } from "../error/EstudanteNaoCadastrado";



class DocenteEndpoint{
	async criar(req:Request, res:Response){
		  try{
            const { nome, email, dataNascimento, idTurma } = req.body

            if(!nome || !email || !dataNascimento || idTurma){
                throw new FaltandoInfo()
            }
            const turmaData = new TurmaData()
            const docenteData = new DocenteData()
            const emailExiste = await docenteData.buscaEstudantePorEmail(email)

            if(emailExiste){
                throw new EmailJaCadastrado()
        }
        
        const idTurmaExiste = await turmadata.buscarTurmaPeloId(idTurma)

        if(!idTurmaExiste.length){
            throw new turmaInvalida()
        }

        const dataConvertida = moment(dataNascimento, "DD/MM/YYYY").format("YYYY-MM-DD")
        const id = Date.now().toString()
        const estudante = new Docente(nome, email, dataConvertida, idTurma, id)

        const response = await docenteData.criarDocente(estudante)

        res.status(201).send({ message: response })

        }catch (error: any){
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }
    async buscarTodos(req:Request, res:Response){
        try{
            const docenteData = new DocenteData()

            const todosDocentes = await docenteData.buscarDocente()

            res.status(200).send(todosDocentes)
        }catch (error: any){
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }
    async mudarTurma(req:Request, res:Response){
        try{
            const id = req.params.id
            const {turmaId} = req.body

            const docenteData = new DocenteData()
            const docenteExiste = await docenteData.buscarDocentePorId(id)

            if(!docenteExiste){
                throw new UsuarioNaoCadastrado()
            }
            const turmadata = new TurmaData()

            const idTurmaExiste = await turmadata.buscarTurmaPeloId(turmaId)

            if(!idTurmaExiste.length){
                throw new turmaInvalida()
            }
            const response = await docenteData.mudarDocenteTurma(id, turmaId)

            res.status(200).send({ message: response })

        }catch (error: any){
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }
}
export default DocenteEndpoint