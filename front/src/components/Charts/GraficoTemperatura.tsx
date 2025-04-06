import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

interface GraficoTemperaturaProps {
  labels: string[];
  data: number[];
  options?: any; // Opcional para personalizar el gráfico
}

const GraficoTemperatura: React.FC<GraficoTemperaturaProps> = ({ labels, data, options }) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // 🔥 Destruye el gráfico al desmontar
      }
    };
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperatura (°C)',
        data,
        backgroundColor: 'rgba(31, 180, 123, 0.7)',
      },
    ],
  };

  const defaultOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Temperatura en el ambiente',
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
          text: 'Temperatura (°C)',
          color: '#fff',
        },
        ticks: {
          color: '#fff',
        },
      },
    },
  };

  return <Bar ref={chartRef as React.MutableRefObject<any>} data={chartData} options={{ ...defaultOptions, ...options }} />;
};

export default GraficoTemperatura;
