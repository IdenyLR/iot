import React, { useRef, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface GraficoHumedadProps {
  labels: string[];
  data: number[];
}

const GraficoHumedad: React.FC<GraficoHumedadProps> = ({ labels, data }) => {
  const chartRef = useRef<ChartJS<'radar'> | null>(null);
    
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);
      
  const chartData: ChartData<'radar'> = {
    labels,
    datasets: [{
      label: 'Humedad (%)',
      data,
      backgroundColor: 'rgba(103,58,183,0.4)',
      borderColor: '#673AB7',
      borderWidth: 2,
    }],
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Humedad en el aire',
        color: '#fff',
        font: {
          size: 18,
          weight: 'bold' as const,
        },
      },
      legend: {
        labels: {
          color: '#fff',
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        pointLabels: {
          color: '#fff',
          font: {
            size: 12
          }
        },
        ticks: {
          color: '#fff',
          backdropColor: 'transparent',
          stepSize: 20
        },
        min: 0,
        max: 100
      }
    }
  };

  return <Radar 
    ref={chartRef} 
    data={chartData} 
    options={options} 
  />;
};

export default GraficoHumedad;