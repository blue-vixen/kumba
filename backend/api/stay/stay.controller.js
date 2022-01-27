const stayService = require('./stay.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getStays(req, res) {
    try {
        var queryParams = req.query;
        const stays = await stayService.query(queryParams)
        res.json(stays);
    } catch (err) {
        logger.error('Failed to get stays', err)
        res.status(500).send({ err: 'Failed to get stays' })
    }
}

// GET BY ID 
async function getStayById(req, res) {
    try {
        const stayId = req.params.id;
        const stay = await stayService.getById(stayId)
        res.json(stay)
    } catch (err) {
        logger.error('Failed to get stay', err)
        res.status(500).send({ err: 'Failed to get stay' })
    }
}

// POST (add stay)
async function addStay(req, res) {
    try {
        const stay = req.body;
        console.log('line 32', stay)
        const addedStay = await stayService.add(stay)
        console.log('line34', addedStay)
        res.json(addedStay)
    } catch (err) {
        logger.error('Failed to add stay', err)
        res.status(500).send({ err: 'Failed to add stay' })
    }
}

// PUT (Update stay)
async function updateStay(req, res) {
    try {
        const stay = req.body;
        const updatedStay = await stayService.update(stay)
        res.json(updatedStay)
    } catch (err) {
        logger.error('Failed to update stay', err)
        res.status(500).send({ err: 'Failed to update stay' })

    }
}

// DELETE (Remove stay)
async function removeStay(req, res) {
    try {
        const stayId = req.params.id;
        const removedId = await stayService.remove(stayId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove stay', err)
        res.status(500).send({ err: 'Failed to remove stay' })
    }
}

module.exports = {
    getStays,
    getStayById,
    addStay,
    updateStay,
    removeStay
}