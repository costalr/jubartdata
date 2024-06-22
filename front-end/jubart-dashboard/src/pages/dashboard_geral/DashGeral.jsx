import React, { useEffect, useState } from 'react';
import './DashGeral.css';
import DataCard from './cards/DataCardGeral';
import fetchDataExpFromApi from '../../api/RequestApiExp';
import fetchDataImpFromApi from '../../api/RequestApiImp';
import axios from 'axios';
import VariationCard from './cards/VariationCard'; 
import growthIcon from './images/growth.png';
import incomeIcon from './images/income.png';
import importIcon from './images/import.png';
import exportIcon from './images/export.png';
import midPriceIconImp from './images/midprice.png';
import midPriceIconExp from './images/midprice.png';


function DashGeral( {} ) {
    const [dataExp, setDataExp] = useState([]);
    const [totalVolumeTonsExp, setTotalVolumeTonsExp] = useState(0);
    const [totalRevenueUSDExp, setTotalRevenueUSDExp] = useState(0);
    const [averagePriceUSDExp, setAveragePriceUSDExp] = useState(0);

    const [dataImp, setDataImp] = useState([]);
    const [totalVolumeTonsImp, setTotalVolumeTonsImp] = useState(0);
    const [totalRevenueUSDImp, setTotalRevenueUSDImp] = useState(0);
    const [averagePriceUSDImp, setAveragePriceUSDImp] = useState(0);

    const [lastAvailableMonth, setLastAvailableMonth] = useState('');
    const [lastAvailableMonthYear, setLastAvailableMonthYear] = useState('');

    const [variationVolumeToPreviousYearExp, setVariationVolumeToPreviousYearExp] = useState('Carregando...');
    const [variationRevenueToPreviousYearExp, setVariationRevenueToPreviousYearExp] = useState('Carregando...');
    const [variationAvgPriceToPreviousYearExp, setVariationAvgPriceToPreviousYearExp] = useState('Carregando...');

    const [variationVolumeToPreviousYearImp, setVariationVolumeToPreviousYearImp] = useState('Carregando...');
    const [variationRevenueToPreviousYearImp, setVariationRevenueToPreviousYearImp] = useState('Carregando...');
    const [variationAvgPriceToPreviousYearImp, setVariationAvgPriceToPreviousYearImp] = useState('Carregando...');

    const [totalVolumeTonsExpPreviousYear, setTotalVolumeTonsExpPreviousYear] = useState(0);
    const [totalRevenueUSDExpPreviousYear, setTotalRevenueUSDExpPreviousYear] = useState(0);
    const [averagePriceUSDExpPreviousYear, setAveragePriceUSDExpPreviousYear] = useState(0);

    const [totalVolumeTonsImpPreviousYear, setTotalVolumeTonsImpPreviousYear] = useState(0);
    const [totalRevenueUSDImpPreviousYear, setTotalRevenueUSDImpPreviousYear] = useState(0);
    const [averagePriceUSDImpPreviousYear, setAveragePriceUSDImpPreviousYear] = useState(0);

    // Effect hook para carregar dados e calcular métricas quando o componente monta
    useEffect(() => {
        const fetchData = async () => {
            // Calcular o período desde janeiro do ano corrente até o mês atual
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;  // Meses são baseados em zero

            const startDate = `${currentYear}-01`; // Janeiro do ano corrente
            const endDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`; // Mês atual do ano corrente

            // Buscar dados de exportação no período definido
            const dataListExp = await fetchDataExpFromApi(startDate, endDate);
            setDataExp(dataListExp);

            // Calcular o volume total em toneladas para exportação
            calculateTotalVolumeTonsExp(dataListExp);

            // Calcular a receita total em USD para exportação
            calculateTotalRevenueUSDExp(dataListExp);

            // Calcular o preço médio de exportação
            calculateAveragePriceExp(dataListExp);

            // Buscar dados de importação no período definido
            const dataListImp = await fetchDataImpFromApi(startDate, endDate);
            setDataImp(dataListImp);

            // Calcular o volume total em toneladas para importação
            calculateTotalVolumeTonsImp(dataListImp);

            // Calcular a receita total em USD para importação
            calculateTotalRevenueUSDImp(dataListImp);

            // Calcular o preço médio de importação
            calculateAveragePriceImp(dataListImp);

            // Buscar o último mês disponível
            fetchLastAvailableMonth();

            // Buscar dados de exportação do ano anterior no mesmo período
            const startDatePreviousYear = `${currentYear - 1}-01`; // Janeiro do ano anterior
            const endDatePreviousYear = `${currentYear - 1}-${currentMonth.toString().padStart(2, '0')}`; // Mesmo mês do ano anterior
            const dataListExpPreviousYear = await fetchDataExpFromApi(startDatePreviousYear, endDatePreviousYear);
            const dataListImpPreviousYear = await fetchDataImpFromApi(startDatePreviousYear, endDatePreviousYear);

            // Calcular o volume total em toneladas para exportação do ano anterior no mesmo período
            const totalKGPreviousYearExp = dataListExpPreviousYear.reduce((acc, item) => {
                const metricKG = parseFloat(item.metricKG);
                if (!isNaN(metricKG)) {
                    return acc + metricKG;
                }
                return acc;
            }, 0);
            const totalTonsPreviousYearExp = totalKGPreviousYearExp / 1000;
            setTotalVolumeTonsExpPreviousYear(totalTonsPreviousYearExp);

            // Calcular a receita total em USD para exportação do ano anterior no mesmo período
            const totalRevenuePreviousYearExp = dataListExpPreviousYear.reduce((acc, item) => {
                const metricFOB = parseFloat(item.metricFOB);
                if (!isNaN(metricFOB)) {
                    return acc + metricFOB;
                }
                return acc;
            }, 0);
            setTotalRevenueUSDExpPreviousYear(totalRevenuePreviousYearExp);

            // Calcular o preço médio de exportação do ano anterior no mesmo período
            const averagePricePreviousYearExp = totalTonsPreviousYearExp > 0 ? totalRevenuePreviousYearExp / totalTonsPreviousYearExp : 0;
            setAveragePriceUSDExpPreviousYear(averagePricePreviousYearExp);

            // Calcular a variação em relação ao ano anterior para exportação
            calculateVariationToPreviousYear(totalTonsPreviousYearExp, totalVolumeTonsExp, setVariationVolumeToPreviousYearExp);
            calculateVariationToPreviousYear(totalRevenuePreviousYearExp, totalRevenueUSDExp, setVariationRevenueToPreviousYearExp);
            calculateVariationToPreviousYear(averagePricePreviousYearExp, averagePriceUSDExp, setVariationAvgPriceToPreviousYearExp);

            // Calcular o volume total em toneladas para importação do ano anterior no mesmo período
            const totalKGPreviousYearImp = dataListImpPreviousYear.reduce((acc, item) => {
                const metricKG = parseFloat(item.metricKG);
                if (!isNaN(metricKG)) {
                    return acc + metricKG;
                }
                return acc;
            }, 0);
            const totalTonsPreviousYearImp = totalKGPreviousYearImp / 1000;
            setTotalVolumeTonsImpPreviousYear(totalTonsPreviousYearImp);

            // Calcular a receita total em USD para importação do ano anterior no mesmo período
            const totalRevenuePreviousYearImp = dataListImpPreviousYear.reduce((acc, item) => {
                const metricFOB = parseFloat(item.metricFOB);
                if (!isNaN(metricFOB)) {
                    return acc + metricFOB;
                }
                return acc;
            }, 0);
            setTotalRevenueUSDImpPreviousYear(totalRevenuePreviousYearImp);

            // Calcular o preço médio de importação do ano anterior no mesmo período
            const averagePricePreviousYearImp = totalTonsPreviousYearImp > 0 ? totalRevenuePreviousYearImp / totalTonsPreviousYearImp : 0;
            setAveragePriceUSDImpPreviousYear(averagePricePreviousYearImp);

            // Calcular a variação em relação ao ano anterior para importação
            calculateVariationToPreviousYear(totalTonsPreviousYearImp, totalVolumeTonsImp, setVariationVolumeToPreviousYearImp);
            calculateVariationToPreviousYear(totalRevenuePreviousYearImp, totalRevenueUSDImp, setVariationRevenueToPreviousYearImp);
            calculateVariationToPreviousYear(averagePricePreviousYearImp, averagePriceUSDImp, setVariationAvgPriceToPreviousYearImp);
        };

        fetchData();
    }, [totalVolumeTonsExp, totalRevenueUSDExp, averagePriceUSDExp, totalVolumeTonsImp, totalRevenueUSDImp, averagePriceUSDImp]);

    // Função para buscar o último mês disponível
    const fetchLastAvailableMonth = async () => {
        try {
            const response = await axios.get('https://api-comexstat.mdic.gov.br/cities/dates/updated');
            const { year, monthNumber } = response.data.data;
            const monthNames = [
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ];
            const lastMonth = monthNames[parseInt(monthNumber, 10) - 1]; // Array de meses é baseado em zero
            setLastAvailableMonth(`${lastMonth} de ${year}`);
            setLastAvailableMonthYear(year);
        } catch (error) {
            console.error('Erro ao buscar última data disponível:', error);
        }
    };

    // Funções para exportação
    const calculateTotalVolumeTonsExp = (dataListExp) => {
        const totalKG = dataListExp.reduce((acc, item) => {
            const metricKG = parseFloat(item.metricKG);
            if (!isNaN(metricKG)) {
                return acc + metricKG;
            }
            return acc;
        }, 0);
        const totalTons = totalKG / 1000;
        setTotalVolumeTonsExp(totalTons);
    };

    const calculateTotalRevenueUSDExp = (dataListExp) => {
        const totalRevenue = dataListExp.reduce((acc, item) => {
            const metricFOB = parseFloat(item.metricFOB);
            if (!isNaN(metricFOB)) {
                return acc + metricFOB;
            }
            return acc;
        }, 0);
        setTotalRevenueUSDExp(totalRevenue);
    };

    const calculateAveragePriceExp = (dataListExp) => {
        const totalTons = dataListExp.reduce((acc, item) => {
            const metricKG = parseFloat(item.metricKG);
            if (!isNaN(metricKG)) {
                return acc + metricKG / 1000; // Convertendo de quilogramas para toneladas
            }
            return acc;
        }, 0);

        const totalRevenue = dataListExp.reduce((acc, item) => {
            const metricFOB = parseFloat(item.metricFOB);
            if (!isNaN(metricFOB)) {
                return acc + metricFOB;
            }
            return acc;
        }, 0);

        if (totalTons > 0) {
            const averagePrice = totalRevenue / totalTons;
            setAveragePriceUSDExp(averagePrice);
        } else {
            setAveragePriceUSDExp(0);
        }
    };

    // Funções para importação
    const calculateTotalVolumeTonsImp = (dataListImp) => {
        const totalKG = dataListImp.reduce((acc, item) => {
            const metricKG = parseFloat(item.metricKG);
            if (!isNaN(metricKG)) {
                return acc + metricKG;
            }
            return acc;
        }, 0);
        const totalTons = totalKG / 1000;
        setTotalVolumeTonsImp(totalTons);
    };

    const calculateTotalRevenueUSDImp = (dataListImp) => {
        const totalRevenue = dataListImp.reduce((acc, item) => {
            const metricFOB = parseFloat(item.metricFOB);
            if (!isNaN(metricFOB)) {
                return acc + metricFOB;
            }
            return acc;
        }, 0);
        setTotalRevenueUSDImp(totalRevenue);
    };

    const calculateAveragePriceImp = (dataListImp) => {
        const totalTons = dataListImp.reduce((acc, item) => {
            const metricKG = parseFloat(item.metricKG);
            if (!isNaN(metricKG)) {
                return acc + metricKG / 1000; // Convertendo de quilogramas para toneladas
            }
            return acc;
        }, 0);

        const totalRevenue = dataListImp.reduce((acc, item) => {
            const metricFOB = parseFloat(item.metricFOB);
            if (!isNaN(metricFOB)) {
                return acc + metricFOB;
            }
            return acc;
        }, 0);

        if (totalTons > 0) {
            const averagePrice = totalRevenue / totalTons;
            setAveragePriceUSDImp(averagePrice);
        } else {
            setAveragePriceUSDImp(0);
        }
    };

    // Função para calcular a variação em relação ao ano anterior
    const calculateVariationToPreviousYear = (previousYear, currentYear, setVariation) => {
        if (previousYear > 0) {
            const variation = ((currentYear - previousYear) / previousYear) * 100;
            setVariation(variation.toFixed(2));
        } else {
            setVariation('N/A');
        }
    };

    // Função para formatar valores com pontos
    const formatValue = (value) => {
        return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.');
    };

    return (
        <div className={`dashboard-geral `}>
        <h1>Painel Geral - {lastAvailableMonth}</h1>
        <div className="data-cards">
            <div className="export">
                <div className="export export-volume">
                    <img src={exportIcon} alt="Export Icon" className="export-icon" />
                    <DataCard className="data-card main-value" title="Volume de Exportação" value={`${formatValue(totalVolumeTonsExp)} t`} />
                    <VariationCard  className="variation-card variation volume-exp"  variation={parseFloat(variationVolumeToPreviousYearExp)} />
                </div>

                <div className="export export-rent">
                    <img src={growthIcon} alt="Growth Icon" className="growth-icon" />
                    <DataCard  className="data-card main-value rent-value"  title="Receita de Exportação (US$)" value={`$${formatValue(totalRevenueUSDExp)}`} />
                    <VariationCard className="variation-card  rent-exp"   variation={parseFloat(variationRevenueToPreviousYearExp)} />
                </div>
                
                <div className="export export-midprice">
                <img src={midPriceIconExp} alt="Midprice Icon" className="midpriceExp-icon" />
                    <DataCard className="data-card main-value" title="Preço Médio de Exportação (US$)" value={`$${formatValue(averagePriceUSDExp)} / t`} />
                    <VariationCard className="variation-card variation midprice-exp"  variation={parseFloat(variationAvgPriceToPreviousYearExp)} />
                </div>
            </div>

            <div className="import">
                <img src={importIcon} alt="Import Icon" className="import-icon" />
                <div className="import import-volume">
                    <DataCard className="data-card main-value" title="Volume de Importação" value={`${formatValue(totalVolumeTonsImp)} t`} />
                    <VariationCard className="variation-card variation volume-imp" variation={parseFloat(variationVolumeToPreviousYearImp)} />
                </div>

                <div className="import import-rent">
                    <img src={incomeIcon} alt="Income Icon" className="income-icon" />
                    <DataCard className="data-card main-value rent-value" title="Receita de Importação (US$)" value={`$${formatValue(totalRevenueUSDImp)}`} />
                    <VariationCard className="variation-card  rent-imp" variation={parseFloat(variationRevenueToPreviousYearImp)} />
                </div>

                <div className="import import-midprice">
                    <img src={midPriceIconImp} alt="Midprice Icon" className="midpriceImp-icon" />
                    <DataCard className="data-card main-value" title="Preço Médio de Importação (US$)" value={`$${formatValue(averagePriceUSDImp)} / t`} />
                     <VariationCard className="variation-card variation midprice-imp" variation={parseFloat(variationAvgPriceToPreviousYearImp)} />
                </div>
            </div>

          
           
        </div>
 

        {/* Seção para exibir os volumes, receitas e preços médios de exportações  e importações do ano anterior. Util para verificação 
        <div className="previous-year-section">
            <h2>Exportações - Ano Anterior (Janeiro a {lastAvailableMonth.split(' ')[0]})</h2>
            <p>Volume Total: {`${formatValue(totalVolumeTonsExpPreviousYear)} t`}</p>
            <p>Receita Total em US$: {`$${formatValue(totalRevenueUSDExpPreviousYear)}`}</p>
            <p>Preço Médio: {`$${formatValue(averagePriceUSDExpPreviousYear)} / t`}</p>
        </div>

        <div className="previous-year-section">
            <h2>Importações - Ano Anterior (Janeiro a {lastAvailableMonth.split(' ')[0]})</h2>
            <p>Volume Total: {`${formatValue(totalVolumeTonsImpPreviousYear)} t`}</p>
            <p>Receita Total em US$: {`$${formatValue(totalRevenueUSDImpPreviousYear)}`}</p>
            <p>Preço Médio: {`$${formatValue(averagePriceUSDImpPreviousYear)} / t`}</p>
        </div>
         */}
    </div>
    );
}

export default DashGeral;


