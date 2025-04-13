import { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import InfoWindowContent from "../components/InfoWindowContent";

interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

const createMarkerImage = (width: number, height: number) => {
  return new window.kakao.maps.MarkerImage(
    `${process.env.REACT_APP_MARKER_IMAGE_URL}`,
    new window.kakao.maps.Size(width, height)
  );
};

const useKakaoMap = (mapContainerId: string, locations: Location[]) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      if (typeof window !== "undefined" && window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById(mapContainerId);
          const mapOption = {
            center: new window.kakao.maps.LatLng(33.362203, 126.529424),
            level: 9,
          };

          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          const normalImage = createMarkerImage(25, 25);
          const hoverImage = createMarkerImage(30, 30);

          locations.forEach((location) => {
            const markerPosition = new window.kakao.maps.LatLng(
              location.latitude,
              location.longitude
            );

            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              map: map,
              image: normalImage,
              title: location.name,
            });

            const infoWindow = new window.kakao.maps.InfoWindow({
              content: renderToStaticMarkup(
                <InfoWindowContent
                  name={location.name}
                  address={location.address}
                />
              ),
            });

            window.kakao.maps.event.addListener(marker, "mouseover", () => {
              marker.setImage(hoverImage);
              infoWindow.open(map, marker);
            });

            window.kakao.maps.event.addListener(marker, "mouseout", () => {
              marker.setImage(normalImage);
              infoWindow.close();
            });

            window.kakao.maps.event.addListener(marker, "click", () => {
              alert(`${location.name}\n${location.address}`);
            });
          });
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        `script[src="${script.src}"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [mapContainerId, locations]);
};

export default useKakaoMap;
