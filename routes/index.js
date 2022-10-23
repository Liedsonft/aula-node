const { response } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../db");

/* GET home page. */
router.get('/', function(req, res, next) {

 const titulo = req.query.titulo;
 const autor = req.query.autor;
 const ano= req.query.ano;

 if (ano == 1)  {
  db.findCustomers("ano")
  .then (customers =>{
    console.log (customers)
     res.render('index', { title: 'Livros', customers });
  })
  .catch (error => console.log(error))
 
 } 

 else if ( ano == -1)  {
  db.findCustomers("antigo")
  .then (customers =>{
    console.log (customers)
     res.render('index', { title: 'Livros', customers });
  })
  .catch (error => console.log(error))
}
 
 else if (autor == 1 )  {
  db.findCustomers("autor")
  .then (customers =>{
    console.log (customers)
     res.render('index', { title: 'Livros', customers });
  })
  .catch (error => console.log(error))
 } 

  db.findCustomers("titulo")
  .then (customers =>{
    console.log (customers)
     res.render('index', { title: 'Livros', customers });
  })
  .catch (error => console.log(error))

})

router.get ('/new', (request,response) => {
  response.render ('customer', {title: 'Cadastro', customer: {}})
})

router.get ('/edit/:customerId', (request, response) => {
  const id = request.params.customerId;
  db.findCustomer(id)
    .then (customer => response.render("customer",{ title:"Edit", customer}))
    .catch (error => console.log(error))

})

router.get ('/delete/:customerId', (request, response) => {
  const id = request.params.customerId
  db.deleteCustomers(id)
    .then (result => response.redirect("/"))
    .catch (error => console.log(error))
})

router.post  ('/new', (request, response) => {
  if (!request.body.titulo)
  return response.redirect ("/new?error = O campo título é obrigatório")

  if (request.body.ano && !/[0-9]+/.test(request.body.ano))
  return response.redirect ("/new?error = O campo idade é numérico")

  const id = request.body.id;
  const titulo = request.body.titulo;
  const ano = parseInt(request.body.ano);
  const autor = request.body.autor;
  const customer = {titulo, autor, ano}
  const promise = id? db.updateCustomers(id ,customer)
                    : db.insertCustomers (customer)

 promise
    .then (result => {
      result.redirect ("/")
    })
    .catch (error => {
      return console.log (error)
    })
  response.redirect('/')
} )

module.exports = router;