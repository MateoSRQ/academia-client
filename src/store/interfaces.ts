export interface Sede {
  id: number;
  codigo: string;
  nombre: string;
  abreviatura: string;
}

export interface SedeStore {
  loading: boolean;
  page: number;
  sede: Sede[];
  listarSedes: (page: number) => {};
  setPagination: () => {};
  guardarSede: (payload: any) => {};
  eliminarSede: (id: number) => {};
  actualizarSede: (payload: any) => {};
}

export interface Departamento {
  id: number;
  departamento: string;
  provincia: string;
  distrito: string;
  localidad: string;
  estadoAuditoria: boolean;
}

export interface LocationStore {
  departamentos: Departamento[];
  provincias: Departamento[];
  distritos: Departamento[];
  listarDeparment: () => {};
  listarProvincias: (departamento: string) => {};
  listarDistritos: (departamento: string, provincia: string) => {};
}

export interface SedeSave {
  id: number;
  codigo: string;
  nombre: string;
  tipo: number;
  idUbigeo: number;
  telefono: string;
  direccion: string;
  latitud: string;
  longitud: string;
  correo: string;
  estadoAuditoria: string;
}
