// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import ActiveIcon from "../Userimage/Redicon-removebg-preview (1).png";
// import ResolvedIcon from "../Userimage/orange-removebg-preview.png";
// import PendingIcon from "../Userimage/location_map_pin_dark_green5__1_-removebg-preview.png";

// const PowerOutageMap = () => {
//   const mapRef = useRef(null);
//   const markerGroupRef = useRef(null);

//   const [outages, setOutages] = useState([]);

//   const fetchOutages = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/outages/");
//       const data = response.data;

//       const outageWithCoordinates = data.map((item, index) => ({
//         id: index + 1,
//         location: item.outage_affected_area || "Unknown Location",
//         lat: item.latitude || 21.1115 + Math.random() * 0.2,
//         lon: item.longitude || 82.0982 + Math.random() * 0.2,
//         status: item.status || "Active",
//         type: item.outage_type || "Feeder",
//       }));

//       setOutages(outageWithCoordinates);
//     } catch (error) {
//       console.error("Error fetching outages:", error);
//     }
//   };

//   useEffect(() => {
//     fetchOutages();
//   }, []);

//   useEffect(() => {
//     if (!mapRef.current) {
//       const mapInstance = L.map("map").setView([21.1115, 82.0982], 10);
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "© OpenStreetMap contributors",
//       }).addTo(mapInstance);

//       mapRef.current = mapInstance;
//       markerGroupRef.current = L.layerGroup().addTo(mapRef.current);
//     }
//   }, []);

//   const getIcon = (status) => {
//     return L.icon({
//       iconUrl:
//         status === "Active"
//           ? ActiveIcon
//           : status === "Resolved"
//           ? ResolvedIcon
//           : PendingIcon,
//       iconSize: [25, 25],
//       iconAnchor: [15, 30],
//       popupAnchor: [0, -30],
//     });
//   };

//   useEffect(() => {
//     if (!mapRef.current || !markerGroupRef.current) return;

//     markerGroupRef.current.clearLayers();

//     outages.forEach((outage) => {
//       const marker = L.marker([outage.lat, outage.lon], {
//         icon: getIcon(outage.status),
//       }).addTo(markerGroupRef.current);

//       marker.bindPopup(`
//         <b>Location:</b> ${outage.location}<br/>
//         <b>Status:</b> ${outage.status}<br/>
//         <b>Type:</b> ${outage.type}<br/>
//         <b>Lat:</b> ${outage.lat}<br/>
//         <b>Long:</b>${outage.lon}
//       `);
//     });
//   }, [outages]);

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h2>Power Outage Notification System - Mahasamund (Chhattisgarh)</h2>

//       <div
//         id="map"
//         style={{
//           height: "500px",
//           width: "80%",
//           margin: "auto",
//           borderRadius: "8px",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default PowerOutageMap;




// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import ActiveIcon from "../Userimage/Redicon-removebg-preview (1).png";
// import ResolvedIcon from "../Userimage/orange-removebg-preview.png";
// import PendingIcon from "../Userimage/location_map_pin_dark_green5__1_-removebg-preview.png";

// const PowerOutageMap = () => {
//   const mapRef = useRef(null);
//   const markerGroupRef = useRef(null);

//   const [outages, setOutages] = useState([]);

//   const fetchOutages = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/updatestatus/");
//       const data = response.data;

//       const outageWithCoordinates = data
//   .filter(item => item.latitude && item.longitude) // sirf valid lat-lon wale
//   .map((item, index) => ({
//     id: index + 1,
//     location: item.outage_affected_area || "Unknown Location",
//     town: item.town || "Unknown Town",
//     lat: item.latitude,
//     lon: item.longitude,
//     status: item.status || "Active",
//     type: item.outage_type || "Feeder",
//   }));

//       setOutages(outageWithCoordinates);
//     } catch (error) {
//       console.error("Error fetching outages:", error);
//     }
//   };

//   useEffect(() => {
//     fetchOutages();
//   }, []);

//   useEffect(() => {
//     if (!mapRef.current) {
//       const mapInstance = L.map("map").setView([21.1115, 82.0982], 10);
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "© OpenStreetMap contributors",
//       }).addTo(mapInstance);

//       mapRef.current = mapInstance;
//       markerGroupRef.current = L.layerGroup().addTo(mapRef.current);
//     }
//   }, []);

//   const getIcon = (status) => {
//     return L.icon({
//       iconUrl:
//         status === "Active"
//           ? ActiveIcon
//           : status === "Resolved"
//           ? ResolvedIcon
//           : PendingIcon,
//       iconSize: [25, 25],
//       iconAnchor: [15, 30],
//       popupAnchor: [0, -30],
//     });
//   };

//   useEffect(() => {
//     if (!mapRef.current || !markerGroupRef.current) return;

//     markerGroupRef.current.clearLayers();

//     outages.forEach((outage) => {
//       const marker = L.marker([outage.lat, outage.lon], {
//         icon: getIcon(outage.status),
//       }).addTo(markerGroupRef.current);

//       marker.bindPopup(`
//         <b>Location:</b> ${outage.location}<br/>
//         <b>Status:</b> ${outage.status}<br/>
//         <b>Type:</b> ${outage.type}<br/>
//         <b>Lat:</b> ${outage.lat}<br/>
//         <b>Long:</b>${outage.lon}
//       `);
//     });
//   }, [outages]);

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h2>Power Outage Notification System - Mahasamund (Chhattisgarh)</h2>

//       <div
//         id="map"
//         style={{
//           height: "500px",
//           width: "80%",
//           margin: "auto",
//           borderRadius: "8px",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default PowerOutageMap;






import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Import your status icons
import ActiveIcon from "../Userimage/Redicon-removebg-preview (1).png";
import ResolvedIcon from "../Userimage/orange-removebg-preview.png";
import PendingIcon from "../Userimage/location_map_pin_dark_green5__1_-removebg-preview.png";

const PowerOutageMap = () => {
  const mapRef = useRef(null);
  const markerGroupRef = useRef(null);

  const [outages, setOutages] = useState([]);

  // ✅ Fetch outages from backend API
  const fetchOutages = async () => {
    try {
      const response = await axios.get("https://power-outage-notification.onrender.com/api/updatestatus/");
      const data = response.data;

      // ✅ Map data to include lat/lon and necessary fields
      const outageWithCoordinates = data.map((item, index) => ({
  id: index + 1,
  location: item.outage_affected_area || "Unknown Location",
  lat:
    item.latitude !== null && item.latitude !== undefined
      ? parseFloat(item.latitude)
      : 21.1115 + Math.random() * 0.2, // fallback random near Mahasamund
  lon:
    item.longitude !== null && item.longitude !== undefined
      ? parseFloat(item.longitude)
      : 82.0982 + Math.random() * 0.2,
  status: item.status || "Active",
  type: item.outage_type || "Feeder",
}));


      console.log("✅ Outages fetched:", outageWithCoordinates);
      setOutages(outageWithCoordinates);
    } catch (error) {
      console.error("❌ Error fetching outages:", error);
    }
  };

  useEffect(() => {
    fetchOutages();
  }, []);

  // ✅ Initialize map on mount
  useEffect(() => {
    if (!mapRef.current) {
      const mapInstance = L.map("map").setView([21.1115, 82.0982], 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstance);

      mapRef.current = mapInstance;
      markerGroupRef.current = L.layerGroup().addTo(mapRef.current);
    }
  }, []);

  // ✅ Return correct icon based on status
  const getIcon = (status) => {
    return L.icon({
      iconUrl:
        status === "Active"
          ? ActiveIcon
          : status === "Resolved"
          ? ResolvedIcon
          : PendingIcon,
      iconSize: [25, 25],
      iconAnchor: [12, 25],
      popupAnchor: [0, -25],
    });
  };

  // ✅ Update markers whenever outages state changes
  useEffect(() => {
    if (!mapRef.current || !markerGroupRef.current) return;

    markerGroupRef.current.clearLayers();

   outages.forEach((outage) => {
  console.log("Placing marker at:", outage.lat, outage.lon, outage.location);

  const marker = L.marker([outage.lat, outage.lon], {
    icon: getIcon(outage.status),
  }).addTo(markerGroupRef.current);

  marker.bindPopup(`
    <b>Location:</b> ${outage.location}<br/>
    <b>Status:</b> ${outage.status}<br/>
    <b>Type:</b> ${outage.type}<br/>
    <b>Lat:</b> ${outage.lat}<br/>
    <b>Lon:</b> ${outage.lon}
  `);
});

  }, [outages]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Power Outage Notification System - Mahasamund (Chhattisgarh)</h2>

      <div
        id="map"
        style={{
          height: "500px",
          width: "80%",
          margin: "auto",
          borderRadius: "8px",
        }}
      ></div>
    </div>
  );
};

export default PowerOutageMap;
