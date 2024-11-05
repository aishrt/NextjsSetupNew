"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Ipmodal from "../../../components/Modal/ipModal";
import "leaflet/dist/leaflet.css";
import MainLoader from "../../../components/ui/MainLoader";

interface MapProps {
  mapData: any[] | undefined; // Define the type for map data
  from: string;
}

function CustomPopup({
  marker,
  data,
  setOpenPopupId,
}: {
  marker: any;
  data: any;
  setOpenPopupId: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentIp, setCurrentIp] = useState("");
  const map = useMap();

  const handleModalOpen = (ip: any) => {
    setCurrentIp(ip);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setCurrentIp("");
    setIsModalOpen(false);
  };

  const closePopup = () => {
    map.closePopup();
    setOpenPopupId(null);
  };

  const sameCoordinatesData = data.filter(
    (item: any) =>
      item.coordinates.lat === marker.coordinates.lat &&
      item.coordinates.lng === marker.coordinates.lng
  );

  const totalEmailCount = sameCoordinatesData.reduce((sum: any, item: any) => {
    return sum + (item.TotalEmai || 0);
  }, 0);

  const totalCompliant = sameCoordinatesData.reduce((sum: any, item: any) => {
    return sum + (item.Compliant || 0);
  }, 0);

  const totalFailure = sameCoordinatesData.reduce((sum: any, item: any) => {
    return sum + (item.Failure || 0);
  }, 0);

  const complaintPercentage = (
    (parseFloat(totalCompliant) / parseFloat(totalEmailCount)) *
    100
  ).toFixed(2);
  const failurePercentage = (
    (parseFloat(totalFailure) / parseFloat(totalEmailCount)) *
    100
  ).toFixed(2);
  return (
    <Popup closeOnClick={false}>
      <div>
        <div style={{ display: "flex" }}>
          <span
            className={`fi fi-${marker?.flagIcon?.toLowerCase()} mb-2 mr-2 ml-3`}
          ></span>
          <h3>{marker.name}</h3>
        </div>
        <div>
          {sameCoordinatesData.map((item: any, index: number) => (
            <div key={index}>
              <h6>
                <b>IP Address - </b>
                <span
                  onClick={() => handleModalOpen(item?.ipAddress)}
                  className="ip text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                  {item?.ipAddress}
                  {/* 

                  : {item?.Failure}
                  : {item?.Compliant} */}
                </span>
              </h6>
            </div>
          ))}
          <Ipmodal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            handleClose={handleModalClose}
            Ip={currentIp}
          />
          {marker.TotalEmai !== undefined && (
            <h6>
              <b>Emails Processed - </b>
              <span style={{ color: "#fa762a" }}>{totalEmailCount}</span>
            </h6>
          )}
          {marker.Compliant !== undefined && (
            <h6>
              <b>Compliant - </b>
              <span
                style={{ color: "#36b393" }}
              >{`${totalCompliant} (${complaintPercentage}%)`}</span>
            </h6>
          )}
          {marker.Failure !== undefined && (
            <h6>
              <b>Failure - </b>
              <span
                style={{ color: "#ff0000" }}
              >{`${totalFailure} (${failurePercentage}%)`}</span>
            </h6>
          )}
        </div>
        <button onClick={closePopup} className="leafButtoncloses">
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </Popup>
  );
}

const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

const GoogleleafletMap = ({ mapData, from }: MapProps) => {
  const [centerLat, setCenterLat] = useState<number>(0);
  const [centerLng, setCenterLng] = useState<number>(0);
  const [zoomValue, setZoomValue] = useState<number>(4);
  const [isMapVisible, setIsMapVisible] = useState<boolean>(false);
  const currentURL = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleTabChange = () => {
    const contactTab = document.getElementById("contact-tab");
    const isActive = contactTab?.classList.contains("active");

    if (isActive) {
      setIsMapVisible(true);
    } else {
      setIsMapVisible(false);
    }
  };

  useEffect(() => {
    if (from && from == "tab") {
      const tabElement = document.getElementById("contact-tab");

      handleTabChange();

      tabElement?.addEventListener("shown.bs.tab", handleTabChange);

      return () => {
        tabElement?.removeEventListener("shown.bs.tab", handleTabChange);
      };
    } else {
      setIsMapVisible(true);
    }
  }, [currentURL]);

  useEffect(() => {
    if(mapData == undefined){
      return; 
    }
    if (mapData && mapData.length > 0) {
      if (from == "dashboard") {
        setCenterLat(38.9637);
        setCenterLng(35.2433);
        setZoomValue(2);
      } else {
        const firstMarker = mapData[0];
        setCenterLat(firstMarker?.coordinates?.lat || 0);
        setCenterLng(firstMarker?.coordinates?.lng || 0);
        setZoomValue(4);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [mapData, currentURL]);

  const customMarkerIcon = new Icon({
    iconUrl: "/assets/images/location-pin.png",
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  return (
    <div className="map-container">
      {isLoading ? ( 
        <MainLoader />
      ) : (
        isMapVisible && (
          <MapContainer
            scrollWheelZoom={false}
            center={[centerLat, centerLng]}
            zoom={zoomValue}
            minZoom={1}
            style={{ height: "640px", width: "100%" }}
          >
            <ResizeMap />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />


            {mapData?.map((marker: any) => (
              <Marker
                key={marker.id}
                position={[
                  marker.coordinates.lat ? marker.coordinates.lat : 0,
                  marker.coordinates.lng ? marker.coordinates.lng : 0,
                ]}
                icon={customMarkerIcon}
              >
                <CustomPopup
                  marker={marker}
                  data={mapData}
                  setOpenPopupId={() => {}}
                />
              </Marker>
            ))}
          </MapContainer>
        )
      )}
    </div>
  );
};

export default GoogleleafletMap;
