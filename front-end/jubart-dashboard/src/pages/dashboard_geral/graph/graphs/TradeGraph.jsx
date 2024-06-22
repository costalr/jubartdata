import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import fetchDataExpFromApi from '../../../../api/RequestApiExp';
import fetchDataImpFromApi from '../../../../api/RequestApiImp';

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TradeGraph() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1;
            const formattedMonth = currentMonth.toString().padStart(2, '0');
            const startDate = '2010-01';
            const endDate = `${currentYear}-${formattedMonth}`;

            const exportData = await fetchDataExpFromApi(startDate, endDate);
            const importData = await fetchDataImpFromApi(startDate, endDate);

            const yearMap = {}; // Mapa dos anos

            // Processar exportações
            exportData.forEach(item => {
                const exportValue = parseFloat(item.metricFOB);
                yearMap[item.year] = yearMap[item.year] || { year: item.year, export: 0, import: 0, balance: 0 };
                yearMap[item.year].export += exportValue;
            });

            // Processar importações
            importData.forEach(item => {
                const importValue = parseFloat(item.metricFOB);
                yearMap[item.year] = yearMap[item.year] || { year: item.year, export: 0, import: 0, balance: 0 };
                yearMap[item.year].import += importValue;
            });

            // Calcular a balança comercial
            Object.keys(yearMap).forEach(year => {
                yearMap[year].balance = yearMap[year].export - yearMap[year].import;
            });

            const processedData = Object.values(yearMap).sort((a, b) => a.year.localeCompare(b.year));

            setChartData({
                labels: processedData.map(data => data.year),
                datasets: [
                    {
                        label: 'Exportação (US$)',
                        data: processedData.map(data => data.export),
                        borderColor: '#8884d8',
                        backgroundColor: 'rgba(136, 132, 216, 0.5)',
                    },
                    {
                        label: 'Importação (US$)',
                        data: processedData.map(data => data.import),
                        borderColor: '#82ca9d',
                        backgroundColor: 'rgba(130, 202, 157, 0.5)',
                    },
                    {
                        label: 'Balança Comercial (US$)',
                        data: processedData.map(data => data.balance),
                        borderColor: '#ff6384',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ]
            });
        };

        fetchData();
    }, []);

    const options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'US$',
                    color: '#F0B900' // Cor do título do eixo Y
                },
                beginAtZero: false,
                min: -1500000000, // -1.5B
                max: 1500000000,  // 1.5B
                ticks: {
                    stepSize: 500000000, // 0.5B
                    color: '#FFFFFF', // Cor dos valores do eixo Y
                    callback: function(value) {
                        return value / 1000000000 + 'B'; // Converter para bilhões
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Ano',
                    color: '#FFFFFF' // Cor do título do eixo X
                },
                ticks: {
                    color: '#FFFFFF' // Cor dos valores do eixo X
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'right',
                align: 'start', // Alinhar ao topo
                labels: {
                    color: '#F0B900' // Cor dos labels da legenda
                },
                padding: 40
            },
            title: {
                display: true,
                text: 'Histórico da Balança Comercial',
                align: 'center',
                color: '#F0B900', // Cor do título do gráfico
                font: {
                    size: 16
                },
                padding: {
                    left: 0
                }
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div style={{ height: '400px' }}>
            <Line data={chartData} options={options} />
        </div>
    );
}

export default TradeGraph;
