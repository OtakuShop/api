const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const { cadastroDeUsuario, buscaDeCampo, loginDeUsuario, buscarToken } = require('../database/mongo_usuario')

router.post("/cadastro", async (req, res) => {
    if (await buscaDeCampo({ email: req.body.email })) {
        res.json({ message: "Esse e-mail já está em uso!", alert: "blue" })
    } else if (await buscaDeCampo({ usuario: req.body.usuario })) {
        res.json({ message: "Esse usuario já está em uso!", alert: "blue" })
    } else {
        const response = await cadastroDeUsuario(req.body);
        res.json(response)
    }
})

router.post("/login", async (req, res) => {
    const response = await loginDeUsuario(req.body.usuario, req.body.senha)
    res.send(response)
})
router.post('/verifica-token', async (req, res) => {
    const response = await buscarToken({ usuario: req.body.usuario })
    console.log(JSON.stringify(response))
    if (response.hasOwnProperty("token")) {
        try {
            let decode = jwt.verify(response.token, "M3GAG4RG3N")
            res.json({ status: true })
        } catch (error) {
            res.json({ status: false })
        }
    } else {
        res.json({ status: false })
    }

})
module.exports = router;