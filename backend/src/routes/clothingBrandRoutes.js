const express = require('express');
const { createClothingBrand, getClothingBrands, getClothingBrandById, updateClothingBrand, deleteClothingBrand } = require('../controllers/clothingBrandController');
const authenticateToken = require('../middlewares/auth');
const authorizeRole = require('../middlewares/role');
const router = express.Router();

/**
 * @swagger
 * /api/clothing-brands:
 *   post:
 *     summary: Cria uma marca de roupa
 *     tags: [Marcas de Roupa]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Criado
 *   get:
 *     summary: Lista todas as marcas de roupa
 *     tags: [Marcas de Roupa]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 * /api/clothing-brands/{id}:
 *   get:
 *     summary: Busca marca de roupa por ID
 *     tags: [Marcas de Roupa]
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
 *     summary: Atualiza marca de roupa
 *     tags: [Marcas de Roupa]
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
 *     summary: Deleta marca de roupa
 *     tags: [Marcas de Roupa]
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
router.post('/', authenticateToken, authorizeRole(['admin', 'user']), createClothingBrand);
router.get('/', authenticateToken, getClothingBrands);
router.get('/:id', authenticateToken, getClothingBrandById);
router.put('/:id', authenticateToken, authorizeRole(['admin', 'user']), updateClothingBrand);
router.delete('/:id', authenticateToken, authorizeRole(['admin', 'user']), deleteClothingBrand);

module.exports = router;
