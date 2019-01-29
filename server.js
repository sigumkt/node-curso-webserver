const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view egine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (erro) => {
        if (erro){
            console.log('Erro ao acessar o arquivo server.log!');
        }
    });
    next();
})

app.use((req, res, next) => {
    res.render('manutencao.hbs');
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('toUpper', (txt) => {
    return txt.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        tituloPagina: 'Página Inicial',        
        textoPagina: 'Seja bem-vindo ao nosso site.'
    });
});

app.get('/sobre', (req, res) => {
    res.render('quem-somos.hbs', {
        tituloPagina: 'Quem Somos'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Erro na requisição'
    });
})

app.listen(3000, () => {
    console.log("Server ativo na porta 3000");
});