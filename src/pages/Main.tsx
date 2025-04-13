import React from "react";
import useKakaoMap from "../hooks/useKakaoMap";
import locations from "../data/locations.json";

const Main: React.FC = () => {
  useKakaoMap("map", locations);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "60rem" }} />
    </>
  );
};

export default Main;
