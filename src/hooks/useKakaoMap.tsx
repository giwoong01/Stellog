import { useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import InfoWindowContent from "../components/InfoWindowContent";

interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface RouteData {
  locations: Location[];
  color: string;
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
  isOptimized: boolean = false,
  routesData?: RouteData[]
) => {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  const createBaseMarker = (location: Location, map: any) => {
    const markerPosition = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );

    const markerImage = createMarkerImage(25, 25, undefined, false);

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      map: map,
      image: markerImage,
      title: location.name,
    });

    const infoWindow = new window.kakao.maps.InfoWindow({
      content: renderToStaticMarkup(
        <InfoWindowContent name={location.name} address={location.address} />
      ),
    });

    window.kakao.maps.event.addListener(marker, "mouseover", () => {
      marker.setImage(createMarkerImage(30, 30, undefined, false));
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

    return marker;
  };

  const createSelectedMarker = (
    location: Location,
    index: number,
    map: any,
    color: string = "#4ade80"
  ) => {
    const markerPosition = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );

    const markerImage = createMarkerImage(30, 30, color, true);

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      map: map,
      image: markerImage,
      title: location.name,
    });

    const infoWindow = new window.kakao.maps.InfoWindow({
      content: renderToStaticMarkup(
        <InfoWindowContent name={location.name} address={location.address} />
      ),
    });

    window.kakao.maps.event.addListener(marker, "mouseover", () => {
      marker.setImage(createMarkerImage(35, 35, color, true));
      infoWindow.open(map, marker);
    });

    window.kakao.maps.event.addListener(marker, "mouseout", () => {
      marker.setImage(markerImage);
      infoWindow.close();
    });

    return marker;
  };

  const createOrderOverlay = (
    location: Location,
    index: number,
    map: any,
    color: string = "#4ade80"
  ) => {
    const position = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );

    const content = `<div style="background:${color};color:#fff;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:bold;border:2px solid #fff;">${
      index + 1
    }</div>`;

    const overlay = new window.kakao.maps.CustomOverlay({
      position,
      content,
      yAnchor: 0.9,
    });

    overlay.setMap(map);
    return overlay;
  };

  const createPolyline = (
    locations: Location[],
    map: any,
    color: string = "#4ade80"
  ) => {
    const path = locations.map(
      (loc) => new window.kakao.maps.LatLng(loc.latitude, loc.longitude)
    );
    const polyline = new window.kakao.maps.Polyline({
      path,
      strokeWeight: 5,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeStyle: "solid",
    });
    polyline.setMap(map);
    return polyline;
  };

  const removeExistingMarker = (location: Location) => {
    const existingMarker = markersRef.current.find(
      (marker) =>
        marker instanceof window.kakao.maps.Marker &&
        marker.getPosition().getLat() === location.latitude &&
        marker.getPosition().getLng() === location.longitude
    );

    if (existingMarker) {
      existingMarker.setMap(null);
      const orderOverlays = markersRef.current.filter(
        (element) =>
          element instanceof window.kakao.maps.CustomOverlay &&
          element.getPosition &&
          element.getPosition().getLat() === location.latitude &&
          element.getPosition().getLng() === location.longitude
      );
      orderOverlays.forEach((overlay) => overlay.setMap(null));
      markersRef.current = markersRef.current.filter(
        (element) =>
          element !== existingMarker && !orderOverlays.includes(element)
      );
    }
  };

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

    markersRef.current.forEach((element) => {
      if (
        element instanceof window.kakao.maps.Marker ||
        element instanceof window.kakao.maps.Polyline ||
        element instanceof window.kakao.maps.CustomOverlay
      ) {
        element.setMap(null);
      }
    });
    markersRef.current = [];

    const map = mapRef.current;

    locations.forEach((location) => {
      const marker = createBaseMarker(location, map);
      markersRef.current.push(marker);
    });

    // 경로 데이터가 있는 경우 (선택적: RouteMyList, RouteStarList에서 사용)
    if (routesData && routesData.length > 0) {
      routesData.forEach((routeData) => {
        const { locations: routeLocations, color } = routeData;

        routeLocations.forEach((location, index) => {
          removeExistingMarker(location);
          const marker = createSelectedMarker(location, index, map, color);
          const orderOverlay = createOrderOverlay(location, index, map, color);
          markersRef.current.push(marker, orderOverlay);
        });

        if (routeLocations.length > 1) {
          const polyline = createPolyline(routeLocations, map, color);
          markersRef.current.push(polyline);
        }
      });
    }
    // 선택된 위치가 있는 경우
    else if (selectedLocations.length > 0) {
      selectedLocations.forEach((location, index) => {
        removeExistingMarker(location);
        const marker = createSelectedMarker(location, index, map);
        markersRef.current.push(marker);

        if (isOptimized) {
          const orderOverlay = createOrderOverlay(location, index, map);
          markersRef.current.push(orderOverlay);
        }
      });

      if (selectedLocations.length > 1) {
        const polyline = createPolyline(selectedLocations, map);
        markersRef.current.push(polyline);
      }
    }
  }, [
    locations,
    onMarkerClick,
    isMapReady,
    selectedLocations,
    isOptimized,
    routesData,
  ]);
};

export default useKakaoMap;
