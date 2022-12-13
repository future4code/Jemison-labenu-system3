import { Request, Response } from "express"
import TurmaData from "../database/TurmaData"
import DocenteData from "../database/DocenteData"
import Docente from "../models/Docente"


export const createEstudante = async (req: Request, res: Response) => {
    try {
        const { nome, email, dataNascimento, turmaId } = req.body;
        const id = Date.now().toString();

        if (!nome || !email || !dataNascimento || !turmaId) {
            req.statusCode = 400;
            throw new Error("Todos os campos devem ser preenchidos!");
          }
          const newTeacher = new Docente(nome, email, turmaId, id);
          const turmaData = new TurmaData();
    
          const TurmaExiste = await turmaData.selectTurmaId(turmaId);
    
          if (!TurmaExiste.length) {
            throw new Error(`Turma com id ${turmaId} não existe`);
          }
          const teacherData = new DocenteData();
    
          await teacherData.insertTeacher(newTeacher);
    
          res.status(201).send(`Docente ${nome} criado com sucesso!`);
        } catch (error: any) {
          res.status(500).send({ message: error.message });
        }
      }
      async getAllTeachers(req: Request, res: Response) {
        try {
          const teacherData = new DocenteData();
    
          const todosDocentes = await teacherData.selectTeachers();
    
          if (!todosDocentes?.length) {
            throw new Error("não há docentes cadastrados");
          }
    
          res.status(200).send(todosDocentes);
        } catch (error: any) {
          res.status(500).send({ message: error.message });
        }
      }

      export default createEstudante