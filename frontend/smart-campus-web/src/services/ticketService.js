import axios from "axios";

const BASE_URL = "http://localhost:8080/api/user/tickets";

export const createTicket = async (formData) => {
  const response = await axios.post(BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};



export const getUserTickets = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};


export const getTicketImages = async (ticketId) => {
  const response = await axios.get(`${BASE_URL}/${ticketId}/images`);
  return response.data;
};

export const getAllTicketsForAdmin = async () => {
  const response = await axios.get("http://localhost:8080/api/admin/tickets");
  return response.data;
};



export const getAdminTicketImages = async (ticketId) => {
  const response = await axios.get(`http://localhost:8080/api/admin/tickets/${ticketId}/images`);
  return response.data;
};

export const assignTechnician = async (ticketId, technicianId) => {
  const response = await axios.put(
    `http://localhost:8080/api/admin/tickets/${ticketId}/assign`,
    { technicianId }
  );
  return response.data;
};


export const getTechnicianTickets = async () => {
  const response = await axios.get("http://localhost:8080/api/technician/tickets");
  return response.data;
};


export const getTechnicianTicketImages = async (ticketId) => {
  const response = await axios.get(`http://localhost:8080/api/technician/tickets/${ticketId}/images`);
  return response.data;
};



export const updateTechnicianResolution = async (ticketId, resolutionNotes) => {
  const response = await axios.put(
    `http://localhost:8080/api/technician/tickets/${ticketId}/resolution`,
    { resolutionNotes }
  );
  return response.data;
};

export const updateTechnicianTicketStatus = async (ticketId, status) => {
  const response = await axios.put(
    `http://localhost:8080/api/technician/tickets/${ticketId}/status`,
    { status }
  );
  return response.data;
};

export const deleteAdminTicket = async (ticketId) => {
  const response = await axios.delete(`http://localhost:8080/api/admin/tickets/${ticketId}`);
  return response.data;
};

export const deleteTechnicianTicket = async (ticketId) => {
  const response = await axios.delete(
    `http://localhost:8080/api/technician/tickets/${ticketId}`
  );
  return response.data;
};