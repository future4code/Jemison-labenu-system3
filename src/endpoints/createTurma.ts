import { Request, Response } from "express"
import TurmaData from "../database/TurmaData"
import Turma from "../models/Turma"
//import connection from "../database/connection"

export const createTurma = async (req: Request, res: Response) => {
    try {
        const { nome } = req.body;
        const id: string = Date.now().toString();
  
        if (!nome) {
          throw new Error("O nome deve ser passado!!");
        }
  
        const newTurma = new Turma(id, nome);
  
        const turmaData = new TurmaData();
  
        const turma = await turmaData.insertClass(newTurma);
  
        res.status(200).send("Turma criada com sucesso");
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    }
  
    async getTurmaAtiva(req: Request, res: Response) {
      try {
        const turmaData = new TurmaData();
  
        const turmasAtivas = await turmaData.selectTurmaAtiva();
  
        if (!turmasAtivas?.length) {
          throw new Error("não há turmas ativas");
        }
  
        res.status(200).send(turmasAtivas);
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    }
  
    async mudarModulo(req: Request, res: Response) {
      try {
        const { turmaId, modulo } = req.body;
  
        if (!turmaId || !modulo) {
          throw new Error("IdTurma e modulo devem ser passados");
        }
  
        const turmaData = new TurmaData();
  
        const TurmaExiste = await turmaData.selectTurmaId(turmaId);
  
        if (!TurmaExiste.length) {
          throw new Error(`Turma com id ${turmaId} não existe`);
        }
  
        if (
          modulo !== "1" &&
          modulo !== "2" &&
          modulo !== "3" &&
          modulo !== "4" &&
          modulo !== "5" &&
          modulo !== "6"
        ) {
          throw new Error(`Módulo ${modulo} inválido`);
        }
  
        await turmaData.updateModule(turmaId, modulo);
  
        res.status(200).send({ message: "modulo alterado com sucesso" });
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    }
  
  export default createTurma