const { response } = require('express');
const express = require('express');
const router = express.Router();
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
  if (!request.body.titulo)
  return response.redirect ("/new?error = O campo título é obrigatório")

  if (request.body.ano && !/[0-9]+/.test(request.body.ano))
  return response.redirect ("/new?error = O campo idade é numérico")
  
  const titulo = request.body.titulo;
  const ano = parseInt(request.body.ano);
  const autor = request.body.autor;

  db.insertCustomers ({titulo, ano, autor})
    .then (result => {
      result.redirect ("/")
    })
    .catch (error => {
      return console.log (error)
    })
  response.redirect('/')
} )

module.exports = router;