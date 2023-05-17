import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getCurrentLocation } from "../native/location";

const KakaoMap = () => {
  const [center, setCenter] = useState({
    lat: 33.5563,
    lng: 126.79581,
  });

  useEffect(() => {
    getCurrentLocation().then(({ lat, lng }) => {
      console.log(lng, lat);
      alert(lng, lat);
      setCenter({
        lat,
        lng,
      });
    });
  }, []);

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: center.lat,
        lng: center.lng,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100vh",
      }}
      level={3} // 지도의 확대 레벨
    >
      <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: center.lat,
          lng: center.lng,
        }}
        draggable={true} // 마커가 드래그 가능하도록 설정합니다
      />
    </Map>
  );
};

export default KakaoMap;
