import express from 'express';
import mongoose from 'mongoose';
import config from './src/config.js';
import router from '../../ProjectBookManagement/bookmanagement/src/router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ type: 'text/plain' }));
app.use('/', router);

try {
    await mongoose.connect(config.mongoURI);
    console.log('Connected to MongoDB');

    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}