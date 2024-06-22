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

function MidPriceGraph() {
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
                const exportVolume = parseFloat(item.metricKG) / 1000; // Convertendo KG para Toneladas
                yearMap[item.year] = yearMap[item.year] || { year: item.year, export: 0, exportVolume: 0, import: 0, importVolume: 0 };
                yearMap[item.year].export += exportValue;
                yearMap[item.year].exportVolume += exportVolume;
            });

            // Processar importações
            importData.forEach(item => {
                const importValue = parseFloat(item.metricFOB);
                const importVolume = parseFloat(item.metricKG) / 1000; // Convertendo KG para Toneladas
                yearMap[item.year] = yearMap[item.year] || { year: item.year, export: 0, exportVolume: 0, import: 0, importVolume: 0 };
                yearMap[item.year].import += importValue;
                yearMap[item.year].importVolume += importVolume;
            });

            // Calcular preço médio
            Object.keys(yearMap).forEach(year => {
                yearMap[year].avgExportPrice = yearMap[year].exportVolume ? yearMap[year].export / yearMap[year].exportVolume : 0;
                yearMap[year].avgImportPrice = yearMap[year].importVolume ? yearMap[year].import / yearMap[year].importVolume : 0;
            });

            const processedData = Object.values(yearMap).sort((a, b) => a.year.localeCompare(b.year));

            // Labels para o eixo X (anos pares de 2010 a 2024)
            const labels = [];
            for (let year = 2010; year <= 2024; year += 2) {
                labels.push(year.toString());
            }

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Preço Médio - Exportação (US$)',
                        data: labels.map(year => {
                            const yearData = processedData.find(data => data.year === year);
                            return yearData ? yearData.avgExportPrice : 0;
                        }),
                        borderColor: '#8884d8',
                        backgroundColor: 'rgba(136, 132, 216, 0.5)',
                    },
                    {
                        label: 'Preço Médio - Importação (US$)',
                        data: labels.map(year => {
                            const yearData = processedData.find(data => data.year === year);
                            return yearData ? yearData.avgImportPrice : 0;
                        }),
                        borderColor: '#82ca9d',
                        backgroundColor: 'rgba(130, 202, 157, 0.5)',
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
                    text: 'Preço Médio (US$)',
                    color:  '#F0B900' // Cor do título do eixo Y
                },
                beginAtZero: false,
                min: 3000,
                max: 7000,
                ticks: {
                    stepSize: 1000,
                    color:  '#FFFFFF', // Cor dos valores do eixo Y
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Ano',
                    color:  '#F0B900' // Cor do título do eixo X
                },
                ticks: {
                    color:  '#FFFFFF',  // Cor dos valores do eixo X
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'right',
                align: 'start', // Alinhar ao topo
                labels: {
                    color:  '#F0B900' // Cor dos labels da legenda
                }
            },
            title: {
                display: true,
                text: 'Média de Preços Anuais do Comércio Exterior',
                align: 'center',
                color: '#F0B900', 
                font: {
                    size: 16
                },
                padding: {
                    left: 0 // Ajuste o valor conforme necessário
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

export default MidPriceGraph;
