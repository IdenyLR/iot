"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Map, { Marker, Popup } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import "./MapboxMap.css"
import type { Parcela } from "../../../../interfaces/SensorData"
import { Droplets, Thermometer, Calendar, User, Leaf, MapPin, CloudRain, Sun } from "lucide-react"

interface MapboxMapProps {
  parcelas: Parcela[]
}

const MapboxMap: React.FC<MapboxMapProps> = ({ parcelas }) => {
  const [selectedLocation, setSelectedLocation] = useState<Parcela | null>(null)
  const mapRef = useRef<any>(null)

  const initialLatitude = parcelas.length ? Number.parseFloat(parcelas[0].latitud) : 21.162421
  const initialLongitude = parcelas.length ? Number.parseFloat(parcelas[0].longitud) : -86.854338

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: [
          Number.parseFloat(selectedLocation.longitud),
          Number.parseFloat(selectedLocation.latitud) + 0.002,
        ],
        duration: 500,
      })
    }
  }, [selectedLocation])

  return (
    <div className="mapbox-container">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: initialLongitude,
          latitude: initialLatitude,
          zoom: 13,
        }}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken="pk.eyJ1IjoibWVsY2hvci1vamVkYSIsImEiOiJjbTI5MXNnamowMG1sMmtweng0YzVkdGZpIn0.XWCJom5a5r0jeVrCku1QAQ"
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {parcelas.map((parcela) => (
          <Marker
            key={parcela.id}
            longitude={Number.parseFloat(parcela.longitud)}
            latitude={Number.parseFloat(parcela.latitud)}
            anchor="bottom"
            onClick={() => setSelectedLocation(parcela)}
          >
            <div className="marker-container">
              {/* Marcador negro con borde blanco para mejor contraste */}
              <MapPin 
                className="h-8 w-8 text-black drop-shadow-md" 
                strokeWidth={2.5}
                fill="black"
                style={{
                  filter: "drop-shadow(0 0 2px white)",
                }}
              />
            </div>
          </Marker>
        ))}

        {selectedLocation && selectedLocation.sensorParcelas && selectedLocation.sensorParcelas.length > 0 && (
          <Popup
            longitude={Number.parseFloat(selectedLocation.longitud)}
            latitude={Number.parseFloat(selectedLocation.latitud)}
            anchor="top"
            closeOnClick={false}
            onClose={() => setSelectedLocation(null)}
            className="custom-popup"
            offset={[0, 20]}
          >
            <div className="popup-content">
              {/* Header */}
              <div className="popup-header">
                <h3 className="popup-title">{selectedLocation.nombre}</h3>
              </div>

              {/* Main Info */}
              <div className="popup-info-section">
                <div className="info-row">
                  <User className="info-icon" />
                  <div className="info-content">
                    <span className="info-label">Responsable</span>
                    <span className="info-value">{selectedLocation.responsable}</span>
                  </div>
                </div>

                <div className="info-row">
                  <Leaf className="info-icon info-icon-green" />
                  <div className="info-content">
                    <span className="info-label">Cultivo</span>
                    <span className="info-value">{selectedLocation.tipo_cultivo}</span>
                  </div>
                </div>

                <div className="info-row">
                  <Calendar className="info-icon info-icon-blue" />
                  <div className="info-content">
                    <span className="info-label">Último Riego</span>
                    <span className="info-value">{new Date(selectedLocation.ultimo_riego).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Sensor Data */}
              <div className="sensor-data-section">
                <h4 className="sensor-data-title">Datos del Sensor</h4>
                <div className="sensor-data-grid">
                  <div className="sensor-card">
                    <div className="sensor-icon-container sensor-icon-red">
                      <Thermometer className="sensor-icon" />
                    </div>
                    <div className="sensor-data">
                      <span className="sensor-label">Temperatura</span>
                      <span className="sensor-value">
                        {selectedLocation.sensorParcelas[selectedLocation.sensorParcelas.length - 1].temperatura}°C
                      </span>
                    </div>
                  </div>

                  <div className="sensor-card">
                    <div className="sensor-icon-container sensor-icon-blue">
                      <Droplets className="sensor-icon" />
                    </div>
                    <div className="sensor-data">
                      <span className="sensor-label">Humedad</span>
                      <span className="sensor-value">
                        {selectedLocation.sensorParcelas[selectedLocation.sensorParcelas.length - 1].humedad}%
                      </span>
                    </div>
                  </div>

                  {/* Nuevo: Datos de Lluvia */}
                  <div className="sensor-card">
                    <div className="sensor-icon-container sensor-icon-indigo">
                      <CloudRain className="sensor-icon" />
                    </div>
                    <div className="sensor-data">
                      <span className="sensor-label">Lluvia</span>
                      <span className="sensor-value">
                        {selectedLocation.sensorParcelas[selectedLocation.sensorParcelas.length - 1].lluvia || '0'} mm
                      </span>
                    </div>
                  </div>

                  {/* Nuevo: Datos de Intensidad Solar */}
                  <div className="sensor-card">
                    <div className="sensor-icon-container sensor-icon-amber">
                      <Sun className="sensor-icon" />
                    </div>
                    <div className="sensor-data">
                      <span className="sensor-label">Intensidad del Sol</span>
                      <span className="sensor-value">
                        {selectedLocation.sensorParcelas[selectedLocation.sensorParcelas.length - 1].intensidad_solar || '0'} W/m²
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  )
}

export default MapboxMap