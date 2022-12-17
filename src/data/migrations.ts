import { connection } from "./connection"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTable = async () => await connection.raw(`
    CREATE TABLE IF NOT EXISTS LabeSystem_Class (
        id VARCHAR(80) PRIMARY KEY,
        name VARCHAR(80) UNIQUE NOT NULL,
        module ENUM('0', '1', '2', '3', '4', '5', '6') DEFAULT '0'
    );  

    CREATE TABLE IF NOT EXISTS LabeSystem_Students (
        id VARCHAR(80) PRIMARY KEY,
        name VARCHAR(180) NOT NULL,
        email VARCHAR(80) UNIQUE NOT NULL,
        date_nasc DATE NOT NULL,
        turma_id VARCHAR(80),
        FOREIGN KEY (turma_id) REFERENCES LabeSystem_Class (id)
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Hobbies (
        id VARCHAR(80) PRIMARY KEY,
        hobby_name VARCHAR(180) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Especialidade (
        id VARCHAR(80) PRIMARY KEY,
        especialidade_name ENUM("JS", "CSS", "React", "Typescript", "Programação Orientada a Objetos") NOT NULL 
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Students_Hobbies (
        id VARCHAR(80) PRIMARY KEY, 
        student_id VARCHAR(80) NOT NULL,
        hobby_id VARCHAR(80) NOT NULL,
        FOREIGN KEY (student_id) REFERENCES LabeSystem_Students (id),
        FOREIGN KEY (hobby_id) REFERENCES LabeSystem_Hobbies (id)
    );        


    `).then(() => console.log('Tabelas criadas.')).catch(printError)

    const finish = async () => await connection.destroy()

    createTable().then().finally(finish)

