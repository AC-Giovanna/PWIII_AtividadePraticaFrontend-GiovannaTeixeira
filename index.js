//Importações
const express = require('express');
const axios = require('axios');

//Tornando o Express executável
const app = express();

//Tornando possível ler JSON e formulários
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Configuração do EJS
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Rotas de acesso às páginas ejs
app.get('/', (req, res) => {
    res.render('index');
});

//ROTAS - INÍCIO

//TAREFAS

//Cadastro
app.get('/CadastrarTarefa', (req, res) => {
    res.render('tarefas/CadastrarTarefas');
});

//Listagem


//ROTAS - FIM

//Servidor
app.listen(3001, () => {
    console.log('Servicor rodando em http://localhost:3001')
});