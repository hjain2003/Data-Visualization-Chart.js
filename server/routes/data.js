import express from 'express';
import { getAllCompanies, getCompanyData } from '../controllers/dataController.js';

const dataRouter = express.Router();

dataRouter.get('/companies',getAllCompanies);
dataRouter.get('/:name',getCompanyData);

export default dataRouter;