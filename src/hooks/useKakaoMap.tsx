import { useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import InfoWindowContent from "../components/InfoWindowContent";

interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

const createMarkerImage = (
  width: number,
  height: number,
  color?: string,
  isSelected?: boolean
) => {
  if (isSelected) {
    const svg = `<svg width="${width}" height="${height}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="${
        color || "#4ade80"
      }" stroke="#fff" stroke-width="4"/>
    </svg>`;
    const url = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
    return new window.kakao.maps.MarkerImage(
      url,
      new window.kakao.maps.Size(width, height)
    );
  } else {
    return new window.kakao.maps.MarkerImage(
      `${process.env.REACT_APP_MARKER_IMAGE_URL}`,
      new window.kakao.maps.Size(width, height)
    );
  }
};

const useKakaoMap = (
  mapContainerId: string,
  locations: Location[],
  onMarkerClick: (location: Location) => void,
  selectedLocations: Location[] = [],
  isOptimized: boolean = false
) => {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (
      !document.querySelector(`script[src="//dapi.kakao.com/v2/maps/sdk.js"]`)
    ) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => initializeMap();
    } else {
      initializeMap();
    }

    function initializeMap() {
      if (typeof window !== "undefined" && window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById(mapContainerId);
          const mapOption = {
            center: new window.kakao.maps.LatLng(33.362203, 126.529424),
            level: 9,
          };

          if (!mapRef.current) {
            mapRef.current = new window.kakao.maps.Map(mapContainer, mapOption);
            setIsMapReady(true);
          }
        });
      }
    }
  }, [mapContainerId]);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current || !isMapReady)
      return;
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const map = mapRef.current;
    locations.forEach((location) => {
      const markerPosition = new window.kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );

      const isSelected = selectedLocations.find(
        (l) =>
          l.latitude === location.latitude && l.longitude === location.longitude
      );

      const markerImage = isSelected
        ? createMarkerImage(30, 30, "#4ade80", true)
        : createMarkerImage(25, 25, undefined, false);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map,
        image: markerImage,
        title: location.name,
      });

      if (isOptimized && isSelected) {
        const selectedIdx = selectedLocations.findIndex(
          (l) =>
            l.latitude === location.latitude &&
            l.longitude === location.longitude
        );
        const orderContent = `<div style="background:#4ade80;color:#fff;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:bold;border:2px solid #036635;">${
          selectedIdx + 1
        }</div>`;

        const orderOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: orderContent,
          yAnchor: 0.9,
        });

        orderOverlay.setMap(map);
        markersRef.current.push(orderOverlay);
      }

      const infoWindow = new window.kakao.maps.InfoWindow({
        content: renderToStaticMarkup(
          <InfoWindowContent name={location.name} address={location.address} />
        ),
      });

      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        marker.setImage(
          isSelected
            ? createMarkerImage(35, 35, "#4ade80", true)
            : createMarkerImage(30, 30, undefined, false)
        );
        infoWindow.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        marker.setImage(markerImage);
        infoWindow.close();
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        infoWindow.close();
        onMarkerClick(location);
      });

      markersRef.current.push(marker);
    });

    if (isOptimized && selectedLocations.length > 1) {
      const path = selectedLocations.map(
        (loc) => new window.kakao.maps.LatLng(loc.latitude, loc.longitude)
      );
      const polyline = new window.kakao.maps.Polyline({
        path,
        strokeWeight: 5,
        strokeColor: "#4ade80",
        strokeOpacity: 0.8,
        strokeStyle: "solid",
      });
      polyline.setMap(map);
      markersRef.current.push(polyline);
    }
  }, [locations, onMarkerClick, isMapReady, selectedLocations, isOptimized]);
};

export default useKakaoMap;
