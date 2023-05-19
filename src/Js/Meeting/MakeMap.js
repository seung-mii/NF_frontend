import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getCurrentLocation } from "../../native/location";

const MakeMap = () => {
  const { kakao } = window;
  //position은 위도 경도
  const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 });
  //address는 주소
  const [address, setAddress] = useState(null);
  const getAddress = (lat, lng) => {
    const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
    const coord = new kakao.maps.LatLng(lat, lng); // 주소로 변환할 좌표 입력
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };
  const setFullAddress = (lat, lng) => {
    setPosition(lat, lng);
    getAddress(position.lat, position.lng);
  };
  useEffect(() => {
    getCurrentLocation().then(({ lat, lng }) => {
      setPosition({
        lat,
        lng,
      });
    });
  }, []);
  return (
    <>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: position.lat,
          lng: position.lng,
        }}
        style={{
          width: "100%",
          height: "85vh",
        }}
        level={3} // 지도의 확대 레벨
        onClick={(_t, mouseEvent) =>
          setFullAddress({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
      >
        {position && <MapMarker position={position} />}
      </Map>
      {position && (
        <p>
          {"클릭한 위치의 위도는 " +
            position.lat +
            " 이고, 경도는 " +
            position.lng +
            " 입니다"}
        </p>
      )}
      {address && (
        <div>
          <p>현재 좌표의 주소는: {address.address_name}</p>
        </div>
      )}
    </>
  );
};

export default MakeMap;
