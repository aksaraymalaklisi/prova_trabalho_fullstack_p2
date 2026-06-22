const express = require('express');
const { createMotorcycle, getMotorcycles, getMotorcycleById, updateMotorcycle, deleteMotorcycle } = require('../controllers/motorcycleController');
const authenticateToken = require('../middlewares/auth');
const authorizeRole = require('../middlewares/role');
const router = express.Router();

/**
 * @swagger
 * /api/motorcycles:
 *   post:
 *     summary: Cria uma moto
 *     tags: [Motos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Criado
 *   get:
 *     summary: Lista todas as motos
 *     tags: [Motos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 * /api/motorcycles/{id}:
 *   get:
 *     summary: Busca moto por ID
 *     tags: [Motos]
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
 *     summary: Atualiza moto
 *     tags: [Motos]
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
 *     summary: Deleta moto
 *     tags: [Motos]
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
router.post('/', authenticateToken, authorizeRole(['admin', 'user']), createMotorcycle);
router.get('/', authenticateToken, getMotorcycles);
router.get('/:id', authenticateToken, getMotorcycleById);
router.put('/:id', authenticateToken, authorizeRole(['admin', 'user']), updateMotorcycle);
router.delete('/:id', authenticateToken, authorizeRole(['admin', 'user']), deleteMotorcycle);

module.exports = router;
