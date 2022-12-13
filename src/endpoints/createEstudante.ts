import { Request, Response } from "express"
import TurmaData from "../database/TurmaData"
import EstudanteData from "../database/EstudanteData"
import Turma from "../models/Turma"
import Estudantes from "../models/Estudante"


export const createEstudante = async (req: Request, res: Response) => {
    try {
        const { nome, email, dataNascimento, turmaId } = req.body;
        const id = Date.now().toString();
    


       if (!nome || !email || !dataNascimento || !turmaId) {
        req.statusCode = 400;
        throw new Error("Todos os campos devem ser preenchidos!");
      }
      const newStudent = new Estudantes(nome, email, turmaId, id);
      const turmaData = new TurmaData();

      const TurmaExiste = await turmaData.selectTurmaId(turmaId);

      if (!TurmaExiste.length) {
        throw new Error(`Turma com id ${turmaId} não existe`);
      }
      const studentsData = new EstudanteData();

      await studentsData.insertStudent(newStudent);

      res.status(201).send("Estudante criado com sucesso!");
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
  async getEstudanteNome(req: Request, res: Response) {
    try {
      const { nome } = req.params;
      const studentsData = new EstudanteData();

      const estudantes = await studentsData.selectEstudanteNomeId(nome);

      if (!estudantes) {
        res.statusCode = 404;
        throw new Error(`Estudante ${nome} não existe!`);
      }      
      res.status(200).send(estudantes);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
  
export default createEstudante