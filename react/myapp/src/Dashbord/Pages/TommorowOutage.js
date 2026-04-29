// import React, { useEffect, useState } from 'react';
// import { Table } from 'antd';
// import { GetTommorrowdata } from "../../CoreApi";

// function TommorowOutage() {
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await GetTommorrowdata();
//       setData(response);
//     } catch (error) {
//       console.error("Error fetching outage data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const columns = [
//     { title: 'S.N.', dataIndex: 'sn', key: 'sn' },
//     { title: 'Town', dataIndex: 'town', key: 'town' },
//     { title: 'Maintenance Activity', dataIndex: 'maintenance_activity', key: 'maintenance_activity' },
//     { title: 'Affected Area', dataIndex: 'outage_affected_area', key: 'outage_affected_area' },
//     { title: 'Outage Area', dataIndex: 'outage_area', key: 'outage_area' },
//     { title: 'Start Date', dataIndex: 'outage_start_date', key: 'outage_start_date' },
//     { title: 'Start Time', dataIndex: 'start_time', key: 'start_time' },
//     { title: 'End Date', dataIndex: 'end_date', key: 'end_date' },
//     { title: 'End Time', dataIndex: 'end_time', key: 'end_time' },
//   ];

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Tomorrow's Scheduled Power Outages</h2>
//       <Table columns={columns} dataSource={data} rowKey="sn" bordered />
//     </div>
//   );
// }

// export default TommorowOutage;


import React from 'react'

function TommorowOutage() {
    console.log("TommorowOutage");
  return (
    <div>
      jai hoooooooooooooooooooooooooo

    </div>
  )
}

export default TommorowOutage

