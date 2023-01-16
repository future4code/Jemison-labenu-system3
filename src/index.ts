import app  from "./app";
import DocenteEndpoint from "./endpoints/Docente";
import EstudanteEndpoint from "./endpoints/Estudante";
import Estudante from "./endpoints/Estudante";
import TurmaEndpoint from "./endpoints/Turma";

const turma = new TurmaEndpoint()
const estudante = new EstudanteEndpoint()
const docente = new DocenteEndpoint()

app.post("/criar-turma", turma.criar)
app.get("/buscar-turmas-ativas", turma.ativa)
app.post("/mudar-modulo/:id", turma.modulo)

app.post("/criar-estudante", estudante.criar)
app.get("/estudante/:nome", estudante.buscar)
app.post("/mudar-estudante/:id", estudante.mudarTurma)

app.post("/criar-docente", docente.criar)
app.get("/buscar-docentes", docente.buscarTodos)
app.post("/mudar-docente-turma/:id", docente.mudarTurma)