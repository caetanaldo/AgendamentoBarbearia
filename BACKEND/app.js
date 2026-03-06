import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'

const app = express();
const PORT = 3000;

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'agendamento'
}

app.use(express.json());
app.use(cors());

app.post('/salvar-agendamento', async (req, res)=>{
    const { nome, procedimento, dia, hora } = req.body;

    let connection;

    try {
        connection = await mysql.createConnection(dbConfig)
        console.log('Conectado ao banco Mysql')

        const insertQuery = `
        INSERT INTO agendamentos (nome, procedimento, dia, hora)
        VALUES (?,?,?,?);
        `;

        const [result] = await connection.execute(insertQuery, [nome, procedimento, dia, hora]);

        console.log(`Agendamento salvo com sucesso! ID: ${result.insertId}`);

        const mensagem = `Olá ${nome}, aguardamos você para realizar o seu procedimento ${procedimento} no dia ${dia} ás ${hora} horas.`

        res.status(200).send({message: mensagem});
        
    } catch (err) {
        console.error("Erro ao processar o agendamento: ", err)
        res.status(500).send({message: 'Erro interno ao salvar o agendamento'})        

    } finally{
        if(connection){
            connection.end();
        }
    }
})

app.get('/listar-agendamentos', async (req, res)=>{
    let connection;

    try {
        
    } catch (err) {
        console.error("Erro ao listar o agendamento: ", err);
        res.status(500).send({message: 'Erro interno ao buscar o agendamento'});        

    } finally{
        if(connection){
            connection.end();
        }
    }
})

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});