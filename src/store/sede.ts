import create from "zustand";
import {
  listarData,
  eliminarData,
  guardarData,
  actualizarData,
  listarDepartamento,
  listarProvincia,
  listarDistrito,
} from "../helpers/sede";
import { SedeStore, LocationStore, SedeSave } from "./interfaces";

export const useSedeStore = create<SedeStore>((set) => ({
  loading: false,
  page: 0,
  sede: [],
  responseTime : "",
  listarSedes: async (page: number) => {
    set({ loading: true });
    const response = await listarData(page);
    
    const { content } = response.data;
    set((state) => ({ sede: state.sede.concat(content), responseTime : response.responseTime }));
    set({ loading: false });
  },
  
  guardarSede: async (payload: SedeSave) => {
    const response = await guardarData(payload);
    set((state) => ({
      sede: [...state.sede, response.dato],
      responseTime : response.responseTime
    }));
    return response;
  },
  eliminarSede: async (id: number) => {
    const response = await eliminarData(id);
    // console.log("response eliminar: ", response);
    set((state) => ({
      sede: state.sede.filter((valor) => valor.id !== id),
    }));
    return response;
  },
  actualizarSede: async (payload: any) => {
    console.log('data de envio :', {  payload });
    const response = await actualizarData(payload);
    console.log('actualizar :', {  response });
    set((state) => ({
      sede: state.sede.map((valor) => {
        if (valor.codigo === payload.codigo) {
          return {
            ...valor,
            nombre: response.dato.nombre,
            idUbigeo: response.dato.idUbigeo,
            direccion: response.dato.direccion,
            latitud: response.dato.latitud,
            longitud: response.dato.longitud,
            activo: response.dato.activo,
          };
        }
        return valor;
      }),
      responseTime : response.responseTime
    }));
    return response;
  },
}));

export const locationStore = create<LocationStore>((set) => ({
  departamentos: [],
  provincias: [],
  distritos: [],
  listarDeparment: async () => {
    const response = await listarDepartamento();
    // console.log('response Departamento :', {  response });
    set({ departamentos: response });
  },
  listarProvincias: async (departamento) => {
    const response = await listarProvincia(departamento);
    // console.log('response provincias :', {  response });
    set({ provincias: response });
  },
  listarDistritos: async (departamento, provincia) => {
    const response = await listarDistrito(departamento, provincia);
    // console.log('response distritos :', {  response });
    set({ distritos: response });
  },
  limpiarProvDist: () => {
    set({ provincias: [], distritos: [] });
  },
}));
