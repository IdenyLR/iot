"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Sidebar from "../../components/UI/Dashboard/Sidebar/Sidebar"
import MapboxMap from "../../components/UI/Dashboard/Map/MapboxMap"
import InfoCard from "../../components/UI/Dashboard/Cards/InfoCard"
import Footer from "../../components/UI/Footer/Footer"
import { obtenerDatosSensores } from "../../services/sensorService"
import type { ApiResponse } from "../../interfaces/SensorData"
import "./Dashboard.css"
import { Thermometer, Droplets, CloudRain, Sun } from "lucide-react"

const Dashboard: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await obtenerDatosSensores()
        setData(response)
        setUltimaActualizacion(new Date())
        setError(null)
      } catch (err) {
        console.error(err)
        setError("Error al cargar datos desde la API")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Actualizar datos cada 60 segundos
    const intervalId = setInterval(fetchData, 60000)

    return () => clearInterval(intervalId)
  }, [])

  if (loading && !data)
    return (
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-main-content">
          <div className="loading">Cargando datos IoT</div>
        </main>
      </div>
    )

  if (error)
    return (
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-main-content">
          <div className="error-message">{error}</div>
        </main>
      </div>
    )

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main-content">
        <h1>Cultivos del Sur | Mapa de Ubicaciones</h1>

        {ultimaActualizacion && (
          <div className="ultima-actualizacion">Última actualización: {ultimaActualizacion.toLocaleTimeString()}</div>
        )}

        <div className="dashboard-map-cards">
          <MapboxMap parcelas={data?.parcelas || []} />

          <div className="cards-grid">
            <InfoCard
              title="Temperatura"
              value={`${data?.sensores.temperatura.toFixed(1) || 0} °C`}
              icon={<Thermometer className="thermometer-icon" size={24} />}
            />
            <InfoCard
              title="Humedad"
              value={`${data?.sensores.humedad.toFixed(1) || 0}%`}
              icon={<Droplets className="droplets-icon" size={24} />}
            />
            <InfoCard
              title="Lluvia"
              value={`${data?.sensores.lluvia.toFixed(1) || 0} mm`}
              icon={<CloudRain className="cloud-rain-icon" size={24} />}
            />
            <InfoCard
              title="Intensidad del Sol"
              value={`${data?.sensores.sol.toFixed(1) || 0}%`}
              icon={<Sun className="sun-icon" size={24} />}
            />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default Dashboard

