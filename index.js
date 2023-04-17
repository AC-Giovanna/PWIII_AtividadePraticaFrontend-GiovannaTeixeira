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
    
    let { id_tarefa } = req.params;

    urlListarTarefaPK = `http://localhost:3000/ListarTarefaPK/${id_tarefa}`;

    axios.get(urlListarTarefaPK)
        .then((response) => {

            let tarefa = response.data;
            console.log(tarefa);
            res.render('tarefas/EditarTarefa', {tarefa})
        })
});
app.post('/EditarTarefa', (req, res) => {

    console.log(req.body);

    const urlEditarTarefa = `http://localhost:3000/AlterarTarefa`;

    axios.put(urlEditarTarefa, req.body)
        .then((response) => {

            const urlListarTarefas = 'http://localhost:3000/ListarTarefas';
            axios.get(urlListarTarefas)
                .then((response) => {
                    console.log(response.data);
                    let tarefas = response.data;
                    res.render('tarefas/ListarTarefas', {tarefas});
                });
        });
});

//Exclusão
app.get('/ExcluirTarefa/:id_tarefa', (req, res) => {
    let {id_tarefa} = req.params;
    const urlExcluirTarefa = `http://localhost:3000/DeletarTarefa/${id_tarefa}`;

    axios.delete(urlExcluirTarefa)
    .then((response) => {
        const urlListarTarefas = 'http://localhost:3000/ListarTarefas';

        axios.get(urlListarTarefas)
        .then((response) => {
            let tarefas = response.data;
            res.render('tarefas/ListarTarefas', {tarefas});
        });
    });
});

//JOGADORES

//Cadastro
app.get('/CadastrarJogador', (req, res) => {
    res.render('jogadores/CadastrarJogadores');
});

//Listagem
app.get('/ListarJogadores', (req, res) => {
    // Requisição para o backend pelo axios
    const urlListarJogadores = 'http://localhost:3000/ListarJogadores';

    axios.get(urlListarJogadores)
    .then((response) => {
        console.log(response.data);

        let jogadores = response.data;
        res.render('jogadores/ListarJogadores', {jogadores});
    });
});

//Edição
app.get('/EditarJogador/:id_jogador', (req, res) => {

    let {id_jogador} = req.params;

    // const urlSelecionarJogador
})

//Exclusão

//AVATARES

//Cadastro
app.get('/CadastrarAvatar', (req, res) => {
    res.render('avatares/CadastrarAvatares');
});

//Listagem
app.get('/ListarAvatares', (req, res) => {
    // Requisição para o backend pelo axios
    const urlListarAvatares = 'http://localhost:3000/ListarAvatar';

    axios.get(urlListarAvatares)
    .then((response) => {
        console.log(response.data);

        let avatares = response.data;
        res.render('avatares/ListarAvatares', {avatares});
    });
});

//Edição
app.get('/EditarAvatares/:id_avatar', (req, res) => {

    let {id_avatar} = req.params;

    const urlListarAvatarPK = `http://localhost:3000/ListarAvatarPK/${id_avatar}`;

    axios.get(urlListarAvatarPK)
        .then((response) => {
            let avatar = response.data;
            console.log(avatar);
            res.render('avatares/EditarAvatares.ejs', {avatar});
        });
});
app.post('/EditarAvatares', (req, res) => {

    console.log(req.body);

    const urlAlterarAvatar = `http://localhost:3000/AlterarAvatar`;

    axios.put(urlAlterarAvatar, req.body)
        .then((response) => {

            const urlListarAvatar = `http://localhost:3000/ListarAvatar`;
            axios.get(urlListarAvatar)
                .then((response) => {
                    console.log(response.data);
                    let avatares = response.data;
                    res.render('avatares/ListarAvatares', {avatares})
                })
        })
})

//Exclusão

//ROTAS - FIM

//Servidor
app.listen(3001, () => {
    console.log('Servidor rodando em http://localhost:3001')
});