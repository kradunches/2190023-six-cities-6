import React, { useEffect, useRef } from 'react';
import type { Offer } from '../entities/offer/interface';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import type { Offer } from '../mocks/offers';

type MapProps = {
  offers: Offer[];
  activeOfferId?: string | null;
  center: [number, number];
  cityChanged?: boolean;
};

const defaultIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

const activeIcon = L.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

export const Map: React.FC<MapProps> = ({ offers, activeOfferId, center, cityChanged }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Инициализация карты
    if (!leafletMapRef.current) {
      leafletMapRef.current = L.map(mapRef.current, {
        center,
        zoom: 12,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMapRef.current);
    } else if (cityChanged) {
      leafletMapRef.current.setView(center, 12);
    }

    // Удаление старых маркеров
    if (markersRef.current) {
      markersRef.current.clearLayers();
    } else {
      markersRef.current = L.layerGroup().addTo(leafletMapRef.current);
    }

    // Добавление новых маркеров
    offers.forEach((offer) => {
      L.marker(
        [offer.location.latitude, offer.location.longitude],
        {
          icon: offer.id === activeOfferId ? activeIcon : defaultIcon,
        }
      ).addTo(markersRef.current!);
    });

    // Очистка карты при размонтировании (чтобы не было утечек памяти)
    return () => {
      markersRef.current?.clearLayers();
    };
  }, [offers, activeOfferId, center, cityChanged]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
      id="cities__leaflet-map-wrapper"
    />
  );
};