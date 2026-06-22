const express = require('express');
const { createCar, getCars, getCarById, updateCar, deleteCar } = require('../controllers/carController');
const authenticateToken = require('../middlewares/auth');
const authorizeRole = require('../middlewares/role');
const router = express.Router();

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Cria um carro
 *     tags: [Carros]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Criado
 *   get:
 *     summary: Lista todos os carros
 *     tags: [Carros]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 * /api/cars/{id}:
 *   get:
 *     summary: Busca carro por ID
 *     tags: [Carros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *   put:
 *     summary: Atualiza carro
 *     tags: [Carros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *   delete:
 *     summary: Deleta carro
 *     tags: [Carros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.post('/', authenticateToken, authorizeRole(['admin', 'user']), createCar);
router.get('/', authenticateToken, getCars);
router.get('/:id', authenticateToken, getCarById);
router.put('/:id', authenticateToken, authorizeRole(['admin', 'user']), updateCar);
router.delete('/:id', authenticateToken, authorizeRole(['admin', 'user']), deleteCar);

module.exports = router;
