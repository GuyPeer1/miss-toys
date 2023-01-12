import React from 'react';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement,Title} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(LinearScale, CategoryScale,BarElement, Tooltip, Legend,Title);

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Average Price By Category',
      },
    },
  };

export function AvgPriceChart({ labelsData, priceData }) {
    const data = {
        labels: labelsData,
        datasets: [
            {
                label: 'Average Price',
                data: priceData,
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
            <Bar data={data} options={options} />
        </div>
    )
}
