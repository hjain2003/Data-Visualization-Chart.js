import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFilePath = path.join(__dirname, '../data/dump.csv');

const readCSVData = async () => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
};

// Controller to get all company names
export const getAllCompanies = async (req, res) => {
    try {
        const data = await readCSVData();
        const companies = [...new Set(data.map((row) => row.index_name))];
        res.json(companies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load company data' });
    }
};

// Controller to get data for a specific company
export const getCompanyData = async (req, res) => {
    try {
        const name = decodeURIComponent(req.params.name);
        const data = await readCSVData();
        
        const companyData = data.filter((row) => row.index_name === name);
        if (companyData.length === 0) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.json(companyData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load company data' });
    }
};
