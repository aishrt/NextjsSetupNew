"use client";
import React, { useEffect, useMemo, useState } from "react";
import geoJson from "../../../public/assets/countries-110m.json";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";


const GoogleReactMap = ({ latitude, title }: any) => {
  const geoUrl = geoJson;
  return (
    <div >
      <ComposableMap projection="geoMercator">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              let contain: boolean = false;
              latitude.map(({ name }: any) => {
                if (name?.toLowerCase() == geo.properties.name.toLowerCase()) {
                  contain = true;
                }
              });
              return (
                <>
                  <Geography
                    style={{
                      default: { fill: contain ? "#52bd94" : "#808080" },
                      hover: { fill: contain ? "#0d9cd4" : "#808080" },
                      pressed: { fill: "#808080" },
                    }}
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#D6D6DA"
                    stroke="#FFFFFF"
                  />
                </>
              );
            })
          }
        </Geographies>
        {latitude?.length > 0 &&
          latitude?.map((item: any, index: number) => {
            return (

                <Marker
                  coordinates={[item?.coordinates?.lng, item?.coordinates?.lat]}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={item?.name}
                  key = {index}
                >
                  <svg
                    fill="#FF0000"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="18px"
                    height="18px"
                    viewBox="0 0 395.71 395.71"
                    // xml:space="preserve"
                  >
                    <g>
                      <path
                        d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
        c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
        C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
        c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
                      />
                    </g>
                  </svg>
                </Marker>
            );
          })}
      </ComposableMap>

      <Tooltip id="my-tooltip"></Tooltip>
    </div>
  );
};

export default React.memo(GoogleReactMap);
