//Carregando Módulos

const express = require('express')
const router = express.Router();
const { buscarDestaques, buscarProdutos, buscarDetalhes } = require('../database/mongo_produtos')

//Funções

const filtro = (data) => {
    let fields = []
    data.forEach(element => {
        fields.push({
            path: element.path,
            name: element.name,
            price: element.price,
            id: element.id
        })
    });
    return fields
}

//Rotas

router.get('/destaques', async (req, res) => {
    const response = filtro(await buscarDestaques())
    res.json(response)
})

router.get('/produtos', async (req, res) => {
    const response = await filtro(await buscarProdutos())
    res.json(response)
})
router.post('/detalhes', async (req, res) => {
    const response = await buscarDetalhes(req.body.id);
    res.json(response)
})

//Exportação das Rotas

module.exports = router;