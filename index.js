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

//Rota de acesso às páginas ejs
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
app.get('/ListarTarefas', (req, res) => {
    // Requisição para o backend pelo axios
    const urlListarTarefas = 'http://localhost:3000/ListarTarefas';

    axios.get(urlListarTarefas)
    .then((response) => {
        console.log(response.data);

        let tarefas = response.data;
        res.render('tarefas/ListarTarefas', {tarefas});
    });
});

//Edição
app.get('/EditarTarefa/:id_tarefa', (req, res) => {
    
    let {id_tarefa} = req.params;
    urlListarTarefaPK = `http://localhost:3000/ListarTarefaPK/${id_tarefa}`;

    axios.get(urlListarTarefaPK)
    .then((response) => {
        let tarefa = response.data;
        // console.log(tarefa.data);
        res.render('tarefas/EditarTarefa', {tarefa})
    })
});
app.post('/EditarTarefa', (req, res) => {
    let {id_tarefa} = req.params;
    const urlEditarTarefa = `http://localhost:3000/AlterarTarefa/${id_tarefa}`;

    axios.put(urlEditarTarefa, req.body)
    .then((response) => {
        //res.redirect('/ListarTarefas');
        console.log(response); 
    })
})

//ROTAS - FIM

//Servidor
app.listen(3001, () => {
    console.log('Servidor rodando em http://localhost:3001')
});