import { Request, Response } from "express";
import { TurmaData } from "../data/TurmaData";
import { EstudanteData } from "../data/EstudanteData";
import { EmailJaCadastrado } from "../error/EmailJaCadastrado";
import { FaltandoInfo } from "../error/FaltandoInfo";
import { turmaInvalida } from "../error/turmaInvalida";
import { Estudante } from "../model/Estudante";
import moment from "moment";
import { UsuarioNaoCadastrado } from "../error/EstudanteNaoCadastrado";

class EstudanteEndpoint{

    async criar(req: Request, res: Response){
        try{
            const { nome, email, dataNascimento, idTurma } = req.body

            if(!nome || !email || !dataNascimento || !idTurma){
                throw new FaltandoInfo()
            }
            const estudanteData = new EstudanteData()
            const turmadata = new TurmaData()
            const emailExiste = await estudanteData.buscaEstudantePorEmail(email)

            if(emailExiste){
                throw new EmailJaCadastrado()
        }
        
        const idTurmaExiste = await turmadata.buscarTurmaPeloId(idTurma)

        if(!idTurmaExiste.length){
            throw new turmaInvalida()
        }

        const dataConvertida = moment(dataNascimento, "DD/MM/YYYY").format("YYYY-MM-DD")
        const id = Date.now().toString()
        const estudante = new Estudante(nome, email, dataConvertida, idTurma)

        const response = await estudanteData.criarEstudante(estudante)

        res.status(201).send({ message: response })

        }catch (error: any){
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }

    async buscar(req: Request, res: Response){
        try{
            const nome = req.params.nome;

            const estudanteData = new EstudanteData()

            const buscarEstudante = await estudanteData.buscarEstudantePorNome(nome)

            if(!buscarEstudante){
                throw new UsuarioNaoCadastrado()
            }

            res.status(200).send(buscarEstudante)

        }catch (error: any){
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }
    async mudarTurma(req: Request, res: Response){
        try{
           const id = req.params.id
           const { turmaId } = req.body

           const estudanteData = new EstudanteData()

           const estudanteExiste = await estudanteData.buscarEstudantePorId(id)

           if(!estudanteExiste){
            throw new  UsuarioNaoCadastrado()
           }

           const turmadata = new TurmaData()

           const idTurmaExiste = await turmadata.buscarTurmaPeloId(turmaId)

           if(!idTurmaExiste.length){
            throw new turmaInvalida()
           }

           const response = await estudanteData.mudarEstudanteTurma(id, turmaId)

           res.status(200).send({message:response})

        }catch (error: any){
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }

}


export default EstudanteEndpoint;