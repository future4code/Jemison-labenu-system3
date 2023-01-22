CREATE TABLE turma(
	id VARCHAR(255) PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL, 
    modulo VARCHAR(255) DEFAULT 0
);

SELECT * FROM turma;
INSERT INTO turma(id, nome) VALUES("001", "jemison");
INSERT INTO turma(id, nome) VALUES("002", "lamarr");
INSERT INTO turma(id, nome) VALUES("003", "barros");


CREATE TABLE hobby(
	id VARCHAR(255) PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL UNIQUE
);
SELECT * FROM hobby;
INSERT INTO hobby VALUES("001", "Assistir séries");
INSERT INTO hobby VALUES("002", "Costurar");
INSERT INTO hobby VALUES("003", "Desenhar");

CREATE TABLE especialidade(
	id VARCHAR(255) PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL UNIQUE
);

SELECT * FROM especialidade;
INSERT  INTO especialidade VALUES("001", "js");
INSERT  INTO especialidade VALUES("002", "css");
INSERT  INTO especialidade VALUES("003", "react");
INSERT  INTO especialidade VALUES("004", "typescript");
INSERT  INTO especialidade VALUES("005", "POO (Programação Orientada a Objetos)");

CREATE TABLE estudante(
    id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    turma_id VARCHAR(255),
    Foreign Key (turma_id) REFERENCES turma(id)
);
SELECT * FROM estudante;
SELECT * FROM estudante WHERE turma_id = "001";
SELECT estudante.*, turma.nome 
as NomeDaTurma
from estudante
INNER JOIN turma
ON estudante.turma_id = turma.id
WHERE turma_id = "001"; 

INSERT INTO estudante values("001", "diogo", "diogo@gmail.com", "1998-11-07", "001");
INSERT INTO estudante values("002", "giovanni", "giovanni@gmail.com", "2000-01-09", "002");
INSERT INTO estudante values("003", "sandra", "sandra@gmail.com", "1990-08-20", "003");
INSERT INTO estudante values("004", "bruna", "bruna@gmail.com", "1989-02-01", "001");
INSERT INTO estudante values("001", "bruna", "bruna@gmail.com", "1989-02-01", "002");
CREATE TABLE docente(
    id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    turma_id VARCHAR(255),
    Foreign Key (turma_id) REFERENCES turma(id)
);

SELECT * FROM docente;
INSERT INTO docente values("001", "janaina", "janaina@gmail.com", "1999-05-03", "001");
INSERT INTO docente values("002", "luiz", "luiz@gmail.com", "2001-07-18", "002");
INSERT INTO docente values("003", "julio", "julio@gmail.com", "2000-02-20", "003"); 
INSERT INTO docente values("004", "julio", "julio@gmail.com", "2001-12-08", "001"); 
INSERT INTO docente values("004", "julio", "julio@gmail.com", "2001-12-08", "002"); 
INSERT INTO docente values("005", "bruno", "bruno@gmail.com", "1988-08-15", "003"); 
INSERT INTO docente values("006", "suelen", "suelen@gmail.com", "1987-03-11", "003");

CREATE TABLE estudante_hobby(
    id VARCHAR(255) PRIMARY KEY,
    estudante_id VARCHAR(255),
    hobby_id VARCHAR(255),
    Foreign Key (estudante_id) REFERENCES estudante(id),
    Foreign Key (hobby_id) REFERENCES hobby(id)
);

SELECT * FROM estudante_hobby;

 SELECT * FROM estudante_hobby 
 INNER JOIN estudante 
 ON estudante_hobby.estudante_id = estudante.id
 INNER JOIN hobby
 ON estudante_hobby.hobby_id = hobby.id;

 SELECT estudante.nome, hobby.nome FROM estudante_hobby 
 INNER JOIN estudante 
 ON estudante_hobby.estudante_id = estudante.id
 INNER JOIN hobby
 ON estudante_hobby.hobby_id = hobby.id;

 SELECT estudante.nome, hobby.nome FROM estudante_hobby 
 INNER JOIN estudante 
 ON estudante_hobby.estudante_id = estudante.id
 INNER JOIN hobby
 ON estudante_hobby.hobby_id = hobby.id
 WHERE estudante.id = "001";
 
INSERT INTO estudante_hobby values("001", "001", "001");
INSERT INTO estudante_hobby values("002", "002", "001");
INSERT INTO estudante_hobby values("002", "001", "003");
INSERT INTO estudante_hobby values("003", "001", "003");
CREATE TABLE docente_especialidade(
    id VARCHAR(255) PRIMARY KEY,
    docente_id VARCHAR(255),
    especialidade_id VARCHAR(255),
    Foreign Key (docente_id) REFERENCES docente(id),
    Foreign Key (especialidade_id) REFERENCES especialidade(id)
);

SELECT * FROM docente_especialidade 
 INNER JOIN docente 
 ON docente_especialidade.docente_id = docente.id
 INNER JOIN especialidade
 ON docente_especialidade.especialidade_id = especialidade.id
 WHERE especialidade.id = "001";

 SELECT docente.*, especialidade.* FROM docente_especialidade 
 INNER JOIN docente 
 ON docente_especialidade.docente_id = docente.id
 INNER JOIN especialidade
 ON docente_especialidade.especialidade_id = especialidade.id
 WHERE especialidade.id = "001";

  SELECT docente.nome, especialidade.nome FROM docente_especialidade 
 INNER JOIN docente 
 ON docente_especialidade.docente_id = docente.id
 INNER JOIN especialidade
 ON docente_especialidade.especialidade_id = especialidade.id
 WHERE especialidade.id = "001";
SELECT * FROM docente_especialidade;
INSERT INTO docente_especialidade values("001", "001", "001");
INSERT INTO docente_especialidade values("002", "001", "002");
INSERT INTO docente_especialidade values("002", "002", "001");
INSERT INTO docente_especialidade values("003", "002", "001");


