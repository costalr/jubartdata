import axios from 'axios';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';

const fetchDataExpFromApi = async (startDate, endDate) => {
    const cacheKey = `import_data_${startDate}_${endDate}`;
 
        // Verificar se os dados já estão armazenados no localStorage
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            try {
                return JSON.parse(decompressFromUTF16(cachedData));
            } catch (error) {
                // Caso haja erro na descompressão ou parse, limpa o cache
                console.error('Erro ao descomprimir ou parsear os dados do cache:', error);
                localStorage.removeItem(cacheKey);
            }
        }
    
    const options = {
        method: 'POST',
        url: 'https://api-comexstat.mdic.gov.br/general',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        data: {
            flow: 'import',
            monthDetail: true,
            period: {
                from: startDate,
                to: endDate,
            },
            filters: [
                {
                    filter: 'heading',
                    values: [
                        '0302', // Peixes frescos ou refrigerados
                        '0303', // Peixes congelados
                        '0304', // Filés de peixe
                        '0305', // Peixes secos, salgados ou em salmoura
                        '0306', // Crustáceos
                        '0307', // Moluscos
                        '0308', // Invertebrados aquáticos
                        '0309', // Farinhas, pós e pellets
                        '1604', // Crustáceos, moluscos e outros invertebrados aquáticos
                        '1605', // Preparações e conservas de Peixe
                    ],
                },
                {
                    filter: 'country',
                    values: [
                        '756', // Africa do Sul
                        '063', // Argentina
                        '069', // Australia
                        '105', // Brasil
                        '149', // Canadá
                        '158', // Chile
                        '160', // China
                        '169', // Colômbia
                        '687', // El Salvador
                        '239', // Equador
                        '245', // Espanha
                        '249', // Estados Unidos
                        '267', // Filipinas
                        '275', // França
                        '305', // Groenlandia
                        '365', // Indonésia
                        '379', // Islândia
                        '386', // Itália
                        '399', // Japão
                        '442', // Lituânia
                        '474', // Marrocos
                        '493', // México
                        '499', // Micronésia
                        '538', // Noruega
                        '548', // Nova Zelândia
                        '565', // Omã
                        '580', // Panamá
                        '589', // Peru
                        '607', // Portugal
                        '623', // Quênia
                        '628', // Reino Unido
                        '888', // República Dominicana
                        '791', // Singapura
                        '750', // Sri Lanka
                        '776', // Tailândia
                        '161', // Taiwan
                        '845', // Uruguai
                        '858', // Vietnã
                    ],
                },
            ],
            details: ['country', 'state', 'ncm', 'heading'],
            metrics: ['metricFOB', 'metricKG'],
        },
    };

    try {
        const response = await axios.request(options);
        if (Array.isArray(response.data.data.list)) {
            // Comprimir os dados antes de armazenar no localStorage
            const compressedData = compressToUTF16(JSON.stringify(response.data.data.list));
            localStorage.setItem(cacheKey, compressedData);
            return response.data.data.list;
        } else {
            console.error('Resposta da API não está no formato esperado.');
            return [];
        }
    } catch (error) {
        if (error.response && error.response.status === 429) {
            // Caso receba o status 429, espere 10 segundos antes de tentar novamente
            await new Promise(resolve => setTimeout(resolve, 10000));
            return fetchDataExpFromApi(startDate, endDate); // Retry
        } else {
            console.error('Erro ao buscar dados da API:', error);
            return [];
        }
    }
};

export default fetchDataExpFromApi;