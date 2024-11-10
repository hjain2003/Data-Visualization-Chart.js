import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, TimeScale, PointElement, LineElement } from 'chart.js';
import 'chartjs-adapter-date-fns'; 
import './Dashboard.css';

Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, TimeScale, PointElement, LineElement);

const Dashboard = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companyData, setCompanyData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dashtxt, setdashtxt] = useState('Select a company to view its data');

    useEffect(() => {
        // Fetch the list of companies
        axios.get('http://localhost:5000/company/companies')
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => console.error('Error fetching companies:', error));
    }, []);

    const fetchCompanyData = (companyName) => {
        setdashtxt('Loading ...');
        axios.get(`http://localhost:5000/company/${encodeURIComponent(companyName)}`)
            .then(response => {
                setSelectedCompany(companyName);
                setCompanyData(response.data);
                setdashtxt('Select a company to view its data');
            })
            .catch(error => console.error('Error fetching company data:', error));
    };

    const formatDate = (dateString) => {
        const dateParts = dateString.split('-'); 
        return new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`); 
    };


    const processedData = [];
    companyData.forEach(data => {
        const date = formatDate(data.index_date); 
        if (!processedData.some(d => d.date.getTime() === date.getTime())) {
            processedData.push({
                date: date,
                openValue: data.open_index_value,
                closeValue: data.closing_index_value,
                highValue: data.high_index_value,
                lowValue: data.low_index_value,
                volume: data.volume,
                peRatio: data.pe_ratio,
                pbRatio: data.pb_ratio,
                divYield: data.div_yield,
            });
        }
    });

    const chartData = {
        labels: processedData.map(data => data.date), 
        datasets: [
            {
                label: 'Closing Value',
                data: processedData.map(data => data.closeValue), 
                borderColor: '#3e95cd',
                fill: false,
            },
            {
                label: 'Opening Value',
                data: processedData.map(data => data.openValue), 
                borderColor: '#8e5ea2',
                fill: false,
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'time', 
                time: {
                    unit: 'day', 
                },
                title: {
                    display: true,
                    text: 'Date',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Index Value',
                }
            }
        }
    };

    // Filter companies based on the search term
    const filteredCompanies = companies.filter(company =>
        company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2>Companies</h2>
                {/* Search Box */}
                <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-box"
                />
                <ul>
                    {filteredCompanies.map((company, index) => (
                        <li
                            key={index}
                            onClick={() => fetchCompanyData(company)}
                            className={company === selectedCompany ? 'selected' : ''}
                        >
                            {company}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chart-container">
                {selectedCompany ? (
                    <>
                        <h2>{selectedCompany} Data</h2>
                        <div className="extra-data">
                            <div><strong>High Index Value:</strong> {processedData[0]?.highValue} |</div>&nbsp;
                            <div><strong>Low Index Value:</strong> {processedData[0]?.lowValue} |</div>&nbsp;
                            <div><strong>Volume:</strong> {processedData[0]?.volume} |</div>&nbsp;
                            <div><strong>P/E Ratio:</strong> {processedData[0]?.peRatio} |</div>&nbsp;
                            <div><strong>P/B Ratio:</strong> {processedData[0]?.pbRatio} |</div>&nbsp;
                            <div><strong>Dividend Yield:</strong> {processedData[0]?.divYield}</div>
                        </div>
                        <Line data={chartData} options={chartOptions} />
                    </>
                ) : (
                    <p>{dashtxt}</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
