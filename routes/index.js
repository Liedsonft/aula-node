const { response } = require('express');
var express = require('express');
var router = express.Router();
const db = require("../db");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.findCustomers()
  .then (customers =>{
    console.log (customers)
     res.render('index', { title: 'Express', customers });
  })
  .catch (error => console.log(error))
 
});

router.get ('/new', (request, response)=>{
  response.render ('customer', {title: 'Cadastro'})
})

router.post  ('/new', (request, response) => {
  if (!request.body.nome)
  return response.redirect ("/?error = O campo nome é obrigatório")

  if (request.body.idade && !/[0-9]+/.test(request.body.idade))
  return response.redirect ("/?error = O campo idade é numérico")
  
  const nome = request.body.nome;
  const idade = parseInt(request.body.idade);
  const cidade = request.body.cidade;
  const uf = request.body.uf.length > 2 ? '' : request.body.uf;
  db.insertCustomers ({nome, idade, cidade, uf})
    .then (result => {
      result.redirect ("/")
    })
    .catch (error => {
      return console.log (error)
    })
  response.redirect('/')
} )

module.exports = router;