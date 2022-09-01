const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    const { code, name, age, race, hp, mana, date_added } = req.body
    if (!code || !name || !hp || !mana) {
        return res.status(404).send('Falta enviar datos obligatorios')
    }
    try {
        const character = await Character.create({
            code,
            name,
            age,
            race,
            hp,
            mana,
            date_added
        })
        return res.status(201).json(character)
    } catch (error) {
        return res.status(404).send('Error en alguno de los datos provistos')
    }
})

router.get('/', async (req, res) => {
    try {
        const { race, code, name, age, hp, mana, date_added } = req.query
        const condition = race
            ? { where: { race } }
            : {}
        const attrQuery = { code, name, age, hp, mana, date_added }

        for (const key in attrQuery) {
            if (attrQuery[key] === 'true') {
                if (!condition.attributes) {
                    condition.attributes = []
                }
                condition.attributes.push(key)
            }
        }
        const characters = await Character.findAll(condition)
        return res.json(characters)
    } catch (error) {
        return res.send(error.message)
    }

})

router.get('/:code', async (req, res) => {
    try {
        const { code } = req.params
        const character = await Character.findByPk(code)
        if (!character) {
            return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
        }
        return res.json(character)
    } catch (error) {
        return res.send(error.message)
    }
})

module.exports = router;