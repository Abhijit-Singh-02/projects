import * as usersController from './controllers/users.js';
import * as booksController from './controllers/books.js';
import * as Auth from './auth/jwt.js';
import { Router } from 'express';

const router = Router();

// Default Homepage
router.get('/', (req, res) => {
    res.status(200).json({ status: true, message: 'Welcome to the Books API' });
});

// User routes
router.post('/login', usersController.login);
router.post('/register', usersController.register);

// Book routes
router.get('/books', Auth.verifyToken, booksController.getAll);
router.get('/books/:id', Auth.verifyToken, booksController.getById);
router.post('/books', Auth.verifyToken, booksController.add);
router.put('/books/:id', Auth.verifyToken, booksController.update);
router.delete('/books/:id', Auth.verifyToken, booksController.remove);

export default router;