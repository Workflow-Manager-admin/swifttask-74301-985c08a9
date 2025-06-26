const express = require('express');
const healthController = require('../controllers/health');
const todoController = require('../controllers/todo');

const router = express.Router();
// Health endpoint

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

// To-Do endpoints

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API for managing to-do items
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Retrieve a list of to-do items
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: A list of to-do items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   text:
 *                     type: string
 *                     example: Buy milk
 *                   completed:
 *                     type: boolean
 *                     example: false
 */
router.get('/todos', todoController.getAll.bind(todoController));

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a to-do item by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single to-do item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 text:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *       404:
 *         description: To-do item not found
 */
router.get('/todos/:id', todoController.getById.bind(todoController));

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new to-do item
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Walk the dog"
 *             required:
 *               - text
 *     responses:
 *       201:
 *         description: The created to-do item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 text:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *       400:
 *         description: Missing required field `text`
 */
router.post('/todos', todoController.create.bind(todoController));

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update an existing to-do item
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: The updated to-do item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 text:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *       404:
 *         description: To-do item not found
 */
router.put('/todos/:id', todoController.update.bind(todoController));

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a to-do item
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: To-do item deleted successfully
 *       404:
 *         description: To-do item not found
 */
router.delete('/todos/:id', todoController.delete.bind(todoController));

module.exports = router;
