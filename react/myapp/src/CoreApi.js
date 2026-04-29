import axios from "axios"; 

const API_URL = "http://127.0.0.1:8000/";

// Fetch login data
export const GEtLoginData = async () => {
  const response = await axios.get(`${API_URL}/api/`);
  return response.data;
};

// Post new categories
export const PostCategories = async (data) => {
  const response = await axios.post(`${API_URL}/api/`, data);
  return response.data;
};

// Get outage data for OutageManagementPage
export const GetOutagedata = async () => {
  const response = await axios.get(`${API_URL}api/updatestatus/`);
  return response.data;
};

// Update user by ID
export const UpdateUser = (id, data) => {
  return axios.put(`${API_URL}api/deleteupdate/${id}/`, data).then((res) => res.data);
};

// Delete user by ID
export const DeleteUser = (id) => {
  return axios.delete(`${API_URL}api/deleteupdate/${id}/`).then((res) => res.data);
};

export const GetTommorrowdata = async () => {
  const response = await axios.get(`${API_URL}api/tommorrowdata/`);
  return response.data;
};
// for sending email
 export const Sendmaildata=()=>{
     const response= axios.get(`${API_URL}/sendmail/`);
     return response.data;
 }
//  for contect
export const Contectdata=async(data)=>{
  const response = await axios.post(`${API_URL}/api/contact/`, data);
  return response.data;
}
// for conting outage
export const CountOutagedata = async () => {
  const response = await axios.get(`${API_URL}api/outages/count/`);
  return response.data;
};

export const ReportData =async(data)=>{
   const response =await axios.post(`${API_URL}/api/report/`,data);  
   return response.data; 
}
 export const GetreportData=async()=>{
      const response=await axios.get(`${ API_URL}/api/report/`)
      return response.data 
 }
//  Outage management
export const Deleteoutage = async (id) => {
  const response = await axios.delete(`${API_URL}/api/updatestatus/${id}/`);
  return response.data;
};
export const Updateoutage = async (id, data) => {
  const response = await axios.put(`${API_URL}/api/updatestatus/update/${id}/`, data);
  return response.data;
}
export const Addoutage = async (data) => {
  const response = await axios.post(`${API_URL}/api/updatestatus/`, data);
  return response.data;
}
// myprofilesection
export const GetProfileData = async (id) => {
  const response = await axios.get(`${API_URL}/api/profile/${id}/`);
  return response.data;
};
export const UpdateProfile = (id, data) => {
  return axios.put(`${API_URL}api/deleteupdate/${id}/`, data).then((res) => res.data);
};
// for geocoading
export const GeocodeData = async (id, data) => {
  const response = await axios.patch(`${API_URL}/api/updatestatus/${id}/`, data);
  return response.data;
};
