import axios from "axios";

export const listarData = async (page: number) => {
  const url = `https://prjboss.uap.edu.pe:8443/sisacademicopruebaback/api/v1/sede/paginado?pageNumber=${page}&pageSize=10&sortDirection=DESC&sortBy=id&estadoAuditoria=true`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const guardarData = async (payload: any) => {
  const url =
    "https://prjboss.uap.edu.pe:8443/sisacademicopruebaback/api/v1/sede/add";
  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const eliminarData = async (id: number) => {
  const url = `https://prjboss.uap.edu.pe:8443/sisacademicopruebaback/api/v1/sede/${id}/remove`;
  try {
    const response = await axios.delete(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const actualizarData = async (payload: any) => {
  const url = `https://prjboss.uap.edu.pe:8443/sisacademicopruebaback/api/v1/sede/${payload.id}`;
  try {
    const response = await axios.put(url, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const listarDepartamento = async () => {
  const url = `https://prjboss.uap.edu.pe:8443/sisacademicopruebaback/api/v1/ubigeo?estadoAuditoria=true&provincia=00&distrito=00`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const listarProvincia = async (payload: number) => {
  const url = `https://prjboss.uap.edu.pe:8443/sisacademicopruebaback/api/v1/ubigeo?estadoAuditoria=true&distrito=00&departamento=${payload}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const listarDistrito = async (
  departamento: number,
  provincia: number
) => {
  const url = `https://prjboss.uap.edu.pe:8443/sisacademicopruebaback/api/v1/ubigeo?estadoAuditoria=true&provincia=${provincia}&departamento=${departamento}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
};
