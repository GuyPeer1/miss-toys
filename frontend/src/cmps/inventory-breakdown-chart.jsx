import React from 'react';
import { Chart as ChartJS, Tooltip, Title, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Title);


export function InventoryBreakdownChart({ labelsData, countData }) {
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Inventory Breakdown',
            },
        },
    }
    const data = {
        labels: labelsData,
        datasets: [
            {
                label: 'Amount of Toys from Category',
                data: countData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    return (
        <div style={{ width: '60%', margin: 'auto' }}>
            <Pie data={data} options={options} />
        </div>
    )
}
