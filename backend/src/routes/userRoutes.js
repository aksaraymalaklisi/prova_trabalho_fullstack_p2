const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');
const authorizeRole = require('../middlewares/role');
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário (Apenas Admin)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Criado
 *   get:
 *     summary: Lista todos os usuários (Apenas Admin)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 * /api/users/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     tags: [Usuários]
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
 *     summary: Atualiza usuário
 *     tags: [Usuários]
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
 *     summary: Deleta usuário
 *     tags: [Usuários]
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
router.post('/', authenticateToken, authorizeRole(['admin']), createUser);
router.get('/', authenticateToken, authorizeRole(['admin']), getUsers);
router.get('/:id', authenticateToken, authorizeRole(['admin']), getUserById);
router.put('/:id', authenticateToken, authorizeRole(['admin']), updateUser);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteUser);

module.exports = router;
