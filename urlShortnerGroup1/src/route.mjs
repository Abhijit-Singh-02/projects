import express from 'express'
import { createURL, getURL } from './controllers/urlController.mjs';
const router = express.Router()

router.get('/:urlCode', getURL);
router.post('/url/shorten', createURL);

export default router;