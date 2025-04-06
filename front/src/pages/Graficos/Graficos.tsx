"use client"

import { GraficoLluvia, GraficoSol, GraficoTemperatura, GraficoHumedad } from "../../components/Charts"
import { obtenerHistoricoSensores, obtenerDatosSensores } from "../../services/sensorService"
import type React from "react"
import { useEffect, useState, useMemo } from "react"
import type { Sensores } from "../../interfaces/SensorData"
import Sidebar from "../../components/UI/Dashboard/Sidebar/Sidebar"
import "./Graficos.css"
import Footer from "../../components/UI/Footer/Footer"

const Graficos: React.FC = () => {
  const [historico, setHistorico] = useState<Sensores[]>([])
  const [datosActuales, setDatosActuales] = useState<Sensores | null>(null)
  const [intervalo, setIntervalo] = useState<string>("horas")
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date | null>(null)
  const [cargando, setCargando] = useState<boolean>(true)

  // Actualización automática cada minuto
  useEffect(() => {
    const fetchData = async () => {
      setCargando(true)
      try {
        const [historicData, currentData] = await Promise.all([obtenerHistoricoSensores(), obtenerDatosSensores()])

        // Convertir los datos actuales al mismo formato que el histórico
        const datosActualesFormateados = {
          fecha_registro: new Date().toISOString(),
          lluvia: currentData.sensores.lluvia,
          sol: currentData.sensores.sol,
          temperatura: currentData.sensores.temperatura,
          humedad: currentData.sensores.humedad,
        }

        setHistorico(historicData)
        setDatosActuales(datosActualesFormateados)
        setUltimaActualizacion(new Date())
      } catch (error) {
        console.error("Error al obtener datos:", error)
      } finally {
        setCargando(false)
      }
    }

    fetchData()
    const intervalId = setInterval(fetchData, 60000)

    return () => clearInterval(intervalId)
  }, [])

  // Procesamiento de datos
  const { labels, processedData } = useMemo(() => {
    const ahora = new Date()
    const fechas: Date[] = []

    // 1. Combinar datos históricos con los actuales
    const todosLosDatos = datosActuales ? [...historico, datosActuales] : [...historico]

    // Ordenar todos los datos por fecha
    const datosOrdenados = [...todosLosDatos].sort(
      (a, b) => new Date(a.fecha_registro).getTime() - new Date(b.fecha_registro).getTime(),
    )

    let datosProcesados: Sensores[] = []

    // 2. Generar las fechas según el intervalo
    switch (intervalo) {
      case "horas":
        for (let i = 0; i < 24; i++) {
          const fecha = new Date(ahora)
          fecha.setHours(ahora.getHours() - (23 - i))
          fechas.push(fecha)
        }
        break
      case "dias":
        for (let i = 0; i < 10; i++) {
          const fecha = new Date(ahora)
          fecha.setDate(ahora.getDate() - (9 - i))
          fechas.push(fecha)
        }
        break
      case "semanas":
        for (let i = 0; i < 10; i++) {
          const fecha = new Date(ahora)
          fecha.setDate(ahora.getDate() - (9 - i) * 7)
          fechas.push(fecha)
        }
        break
    }

    // 3. Agrupar los datos según el intervalo
    datosProcesados = fechas.map((fecha) => {
      // Encontrar el dato más reciente para este intervalo
      const datoMasReciente = datosOrdenados.find((reg) => {
        const fechaReg = new Date(reg.fecha_registro)
        switch (intervalo) {
          case "horas":
            return fechaReg.getHours() === fecha.getHours() && fechaReg.getDate() === fecha.getDate()
          case "dias":
            return (
              fechaReg.getDate() === fecha.getDate() &&
              fechaReg.getMonth() === fecha.getMonth() &&
              fechaReg.getFullYear() === fecha.getFullYear()
            )
          case "semanas":
            return (
              fechaReg.getFullYear() === fecha.getFullYear() &&
              fechaReg.getMonth() === fecha.getMonth() &&
              Math.floor(fechaReg.getDate() / 7) === Math.floor(fecha.getDate() / 7)
            )
          default:
            return false
        }
      })

      // Si no hay datos para este intervalo, retornar 0 o un valor vacío
      if (!datoMasReciente) {
        return {
          fecha_registro: fecha.toISOString(),
          lluvia: 0,
          sol: 0,
          temperatura: 0,
          humedad: 0,
        }
      }

      // Retornar el dato más reciente encontrado
      return {
        fecha_registro: fecha.toISOString(),
        lluvia: datoMasReciente.lluvia,
        sol: datoMasReciente.sol,
        temperatura: datoMasReciente.temperatura,
        humedad: datoMasReciente.humedad,
      }
    })

    // 4. Formatear las etiquetas
    const formattedLabels = fechas.map((fecha) => {
      switch (intervalo) {
        case "horas":
          return `${fecha.getHours()}:00`
        case "dias":
          return `${fecha.getDate()}/${fecha.getMonth() + 1}`
        case "semanas":
          return `Sem ${Math.floor(fecha.getDate() / 7) + 1}`
        default:
          return ""
      }
    })

    // 5. Para el intervalo de horas, asegurarnos de que la última hora sea la actual
    if (intervalo === "horas" && datosActuales) {
      const ultimaHoraIndex = formattedLabels.length - 1
      const ahora = new Date()
      formattedLabels[ultimaHoraIndex] = `${ahora.getHours()}:${ahora.getMinutes().toString().padStart(2, "0")}`

      // Actualizar el último dato con los valores actuales
      if (datosProcesados.length > 0) {
        datosProcesados[datosProcesados.length - 1] = {
          fecha_registro: ahora.toISOString(),
          lluvia: datosActuales.lluvia,
          sol: datosActuales.sol,
          temperatura: datosActuales.temperatura,
          humedad: datosActuales.humedad,
        }
      }
    }

    return {
      labels: formattedLabels,
      processedData: datosProcesados,
    }
  }, [historico, datosActuales, intervalo])

  return (
    <div className="graficos-dashboard">
      <Sidebar />

      <main className="graficos-container">
        <h1>Estadística general de Sensores</h1>

        <div className="ultima-actualizacion">
          Última actualización: {ultimaActualizacion?.toLocaleTimeString() || "Cargando..."}
        </div>

        {datosActuales && (
          <div className="datos-actuales">
            <div className="dato-item">
              <span className="dato-label">Temperatura</span>
              <span className="dato-valor">{datosActuales.temperatura.toFixed(1)}</span>
              <span className="dato-unidad">°C</span>
            </div>
            <div className="dato-item">
              <span className="dato-label">Humedad</span>
              <span className="dato-valor">{datosActuales.humedad.toFixed(1)}</span>
              <span className="dato-unidad">%</span>
            </div>
            <div className="dato-item">
              <span className="dato-label">Lluvia</span>
              <span className="dato-valor">{datosActuales.lluvia.toFixed(1)}</span>
              <span className="dato-unidad">mm</span>
            </div>
            <div className="dato-item">
              <span className="dato-label">Radiación Solar</span>
              <span className="dato-valor">{datosActuales.sol.toFixed(1)}</span>
              <span className="dato-unidad">W/m²</span>
            </div>
          </div>
        )}

        <div className="intervalo-selector">
          <label>Mostrar datos por:</label>
          <select onChange={(e) => setIntervalo(e.target.value)} value={intervalo}>
            <option value="horas">Últimas 24 horas</option>
            <option value="dias">Últimos 10 días</option>
            <option value="semanas">Últimas 10 semanas</option>
          </select>
        </div>

        <div className="graficos-grid">
          <div className="grafico-box">
            <GraficoTemperatura labels={labels} data={processedData.map((d) => d.temperatura)} />
          </div>
          <div className="grafico-box">
            <GraficoHumedad labels={labels} data={processedData.map((d) => d.humedad)} />
          </div>
          <div className="grafico-box">
            <GraficoLluvia labels={labels} data={processedData.map((d) => d.lluvia)} />
          </div>
          <div className="grafico-box">
            <GraficoSol labels={labels} data={processedData.map((d) => d.sol)} />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default Graficos

