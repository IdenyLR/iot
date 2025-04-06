import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

interface GraficoLluviaProps {
  labels: string[];
  data: number[];
  options?: any; // Opcional para personalizar el gráfico
}

const GraficoLluvia: React.FC<GraficoLluviaProps> = ({ labels, data, options }) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); 
      }
    };
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Lluvia (mm)',
        data,
        borderColor: '#4FC3F7',
        backgroundColor: 'rgba(79, 195, 247, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const defaultOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Nivel de lluvia',
        color: '#fff',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha / Hora',
          color: '#fff',
        },
        ticks: {
          color: '#fff',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad de lluvia (mm)',
          color: '#fff',
        },
        ticks: {
          color: '#fff',
        },
      },
    },
  };

  return <Line ref={chartRef as React.MutableRefObject<any>} data={chartData} options={{ ...defaultOptions, ...options }} />;
};

export default GraficoLluvia;
