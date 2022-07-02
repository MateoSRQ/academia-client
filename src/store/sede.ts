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
  sede: [],
  listarSedes: async (page: number) => {
    set({ loading: true });
    const response = await listarData(page);
    const { content } = response;
    set((state) => ({ sede: state.sede.concat(content) }));
    set({ loading: false });
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
    console.log(response);
    set((state) => ({
      sede: state.sede.filter((valor) => valor.id !== id),
    }));
    return response;
  },
  actualizarSede: async (payload: any) => {
    const response = await actualizarData(payload);
    console.log(response);
    set((state) => ({
      sede: state.sede.map((valor) => {
        if (valor.codigo === payload.codigo) {
          return {
            ...valor,
            nombre: payload.nombre,
            abreviatura: payload.abreviatura,
            estado: payload.estado,
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
}));
