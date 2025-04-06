import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraficoSolProps {
  labels: string[];
  data: number[];
}

const GraficoSol: React.FC<GraficoSolProps> = ({ labels, data }) => {
  const chartRef = useRef<ChartJS<'line'> | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [{
      label: 'Intensidad solar (%)',
      data,
      borderColor: '#FFD54F',
      backgroundColor: 'rgba(255, 213, 79, 0.5)',
      tension: 0.4,
    }],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Intensidad solar',
        color: '#fff',
      },
    },
    scales: {
      x: {
        title: { 
          display: true, 
          text: 'Fecha/Hora', 
          color: '#fff' 
        },
        ticks: { 
          color: '#fff' 
        },
      },
      y: {
        min: 0,
        max: 100,
        title: { 
          display: true, 
          text: 'Intensidad (%)', 
          color: '#fff' 
        },
        ticks: { 
          color: '#fff',
          callback: function(value) {
            return `${value}%`;
          }
        },
      },
    },
  };

  return <Line 
    ref={chartRef} 
    data={chartData} 
    options={options} 
  />;
};

export default GraficoSol;