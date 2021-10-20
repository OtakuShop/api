//Carregando Módulos

const express = require('express')
const router = express.Router();
const { buscarCarrinho } = require('../database/mongo_carrinho')
//Funções


//Rotas

router.post('/carrinho', async (req, res) => {
    const response = await buscarCarrinho({ usuario: req.body.usuario })
    res.json(response)
})

//Exportação das Rotas

module.exports = router;