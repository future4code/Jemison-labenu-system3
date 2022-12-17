import app from "./app";
import { CreateDocente } from "./endpoints/CreateDocente";
import { CreateEstudante } from "./endpoints/CreateEstudante";
import { CreateTurma } from "./endpoints/CreateTurma";

const turmaCreate = new CreateTurma()
const estudanteCreate = new CreateEstudante()
const docenteCreate = new CreateDocente()


app.get("/turma", turmaCreate.getTurma)
app.get("/estudante", estudanteCreate.getEstudanteName)
app.get("/docente", docenteCreate.getDocente)


app.post("/turma", turmaCreate.createTurma)
app.post("/estudante/:id", estudanteCreate.postTurmaEstudante)
app.post("/estudante", estudanteCreate.createEstudante)
app.post("/docente", docenteCreate.createDocente)


app.put("/turma/:id", turmaCreate.putTurmaModulo)
app.put("/docente/:id", docenteCreate.putTurmaDocente)


