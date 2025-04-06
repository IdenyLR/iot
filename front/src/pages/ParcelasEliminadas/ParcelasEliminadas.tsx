"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { obtenerParcelasInactivas } from "../../services/sensorService"
import type { Parcela } from "../../interfaces/SensorData"
import Sidebar from "../../components/UI/Dashboard/Sidebar/Sidebar"
import Footer from "../../components/UI/Footer/Footer"
import { PackageOpen } from "lucide-react"
import "./ParcelasEliminadas.css"

const ParcelasEliminadas: React.FC = () => {
  const [parcelas, setParcelas] = useState<Parcela[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await obtenerParcelasInactivas()
        setParcelas(data)
        setUltimaActualizacion(new Date())
        setError(null)
      } catch (err) {
        console.error(err)
        setError("Error al cargar parcelas inactivas")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading)
    return (
      <div className="eliminadas-dashboard">
        <Sidebar />
        <main className="eliminadas-container">
          <div className="loading">Cargando parcelas inactivas</div>
        </main>
      </div>
    )

  if (error)
    return (
      <div className="eliminadas-dashboard">
        <Sidebar />
        <main className="eliminadas-container">
          <div className="error-message">{error}</div>
        </main>
      </div>
    )

  return (
    <div className="eliminadas-dashboard">
      <Sidebar />
      <main className="eliminadas-container">
        <h1>Parcelas Eliminadas</h1>

        {ultimaActualizacion && (
          <div className="ultima-actualizacion">Última actualización: {ultimaActualizacion.toLocaleTimeString()}</div>
        )}

        {parcelas.length === 0 ? (
          <div className="vacío-container">
            <PackageOpen className="vacío-icon" size={48} />
            <p className="vacío-text">No hay parcelas eliminadas en este momento.</p>
            <p className="vacío-subtext">Las parcelas eliminadas aparecerán aquí cuando se elimine alguna.</p>
          </div>
        ) : (
          <div className="eliminadas-grid">
            {parcelas.map((parcela) => (
              <div key={parcela.id} className="parcela-card">
                <h2>{parcela.nombre}</h2>
                <p>
                  <strong>Ubicación:</strong> {parcela.ubicacion}
                </p>
                <p>
                  <strong>Responsable:</strong> {parcela.responsable}
                </p>
                <p>
                  <strong>Cultivo:</strong> {parcela.tipo_cultivo}
                </p>
                <p>
                  <strong>Último Riego:</strong> {new Date(parcela.ultimo_riego).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
        <Footer />
      </main>
    </div>
  )
}

export default ParcelasEliminadas

