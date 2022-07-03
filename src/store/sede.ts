import create from "zustand";
import {
  listarData,
  eliminarData,
  guardarData,
  actualizarData,
  listarDepartamento,
  listarProvincia,
  listarDistrito,
} from "../components/helpers/sede";
import { SedeStore, LocationStore, SedeSave } from "./interfaces";

export const useSedeStore = create<SedeStore>((set) => ({
  loading: false,
  page: 0,
  sede: [],
  listarSedes: async (page: number) => {
    set({ loading: true });
    const response = await listarData(page);
    console.log("response: ", response);
    const { content } = response;
    set((state) => ({ sede: state.sede.concat(content) }));
    set({ loading: false });
  },
  setPagination: () => {
    set((state) => ({
      page: state.page + 1,
    }));
  },
  guardarSede: async (payload: SedeSave) => {
    const response = await guardarData(payload);
    set((state) => ({
      sede: [...state.sede, response.dato],
    }));
    return response;
  },
  eliminarSede: async (id: number) => {
    const response = await eliminarData(id);
    set((state) => ({
      sede: state.sede.filter((valor) => valor.id !== id),
    }));
    return response;
  },
  actualizarSede: async (payload: any) => {
    const response = await actualizarData(payload);
    console.log({ response });
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
            estadoAuditoria: response.dato.estadoAuditoria,
          };
        }
        return valor;
      }),
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
    set({ departamentos: response });
  },
  listarProvincias: async (departamento) => {
    const response = await listarProvincia(departamento);
    set({ provincias: response });
  },
  listarDistritos: async (departamento, provincia) => {
    const response = await listarDistrito(departamento, provincia);
    set({ distritos: response });
  },
  limpiarProvDist: () => {
    set({ provincias: [], distritos: [] });
  },
}));
