//Carregando Módulos

const express = require("express");
const app = express();
const cors = require('cors')
const ProductRoute = require('./routes/produtos')
const CartRoute = require('./routes/carrinho')
const UserRoute = require('./routes/usuario')

//Configurações

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors)
    next();
})
const PORT = process.env.PORT || 3000;

//Rotas

app.use('/', ProductRoute)
app.use('/', CartRoute)
app.use('/', UserRoute)
app.get('/', (req, res) => {
    res.json({ status: "ok" })
})


app.listen(PORT, () => {
    console.log("Rodando o API na porta " + PORT);
})