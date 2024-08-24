import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const Feature = () => {
    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Donors',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Recipients',
                data: [7, 11, 5, 8, 3, 7],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };
    const pieData = {
        labels: ['Doctors', 'Donors', 'Recipients', 'Applications'],
        datasets: [
            {
                label: 'Statistics',
                data: [12, 19, 3, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const stats = {
        donors: 120,
        recipients: 80,
        doctors: 45,
        applications: 150,
    };

    return (
        <div className="dashboard">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="stat bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Donors</h2>
                    <p className="text-3xl font-bold">{stats.donors}</p>
                </div>
                <div className="stat bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Recipients</h2>
                    <p className="text-3xl font-bold">{stats.recipients}</p>
                </div>
                <div className="stat bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Doctors</h2>
                    <p className="text-3xl font-bold">{stats.doctors}</p>
                </div>
                <div className="stat bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Applications</h2>
                    <p className="text-3xl font-bold">{stats.applications}</p>
                </div>
            </div>

           
            <div className="charts grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                <div className="bar-chart bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Monthly Statistics</h2>
                    <Bar data={barData} />
                </div>

                
                <div className="pie-chart bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Overview</h2>
                    <Pie data={pieData} />
                </div>
            </div>
        </div>
    );
};

export default Feature;
