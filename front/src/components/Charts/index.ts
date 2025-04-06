export { default as GraficoLluvia } from './GraficoLluvia';
export { default as GraficoSol } from './GraficoSol';
export { default as GraficoTemperatura } from './GraficoTemperatura';
export { default as GraficoHumedad } from './GraficoHumedad';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend
  );