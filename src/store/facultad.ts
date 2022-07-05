import create from "zustand"
import { deleteData, fetchData, saveData, updateData } from "../helpers/facultad"

interface Facultad {    
    id: number
    codigo: string
    nombre: string
    abreviatura: string
    activo : boolean
}

interface FacultadStore {
    facultad: Facultad[]
    listaFiltrada : Facultad[]
    responseTime : string
    listarFacultad: () => void
    guardarFacultad: (payload: any) => {}
    eliminarFacultad: (id: number) => {}
    actualizarFacultad: (payload: any) => {}
    filtrarFacultad : (busqueda : string) => void
    cargarLista : () => void
}

export const useFacultadStore = create<FacultadStore>((set) => ({
    facultad: [],
    listaFiltrada : [],
    responseTime : "",
    listarFacultad: async () => {
        const response = await fetchData()
        console.log(response)        
        set({ facultad: response.data.content, listaFiltrada: response.data.content, responseTime : response.responseTime })        
    },
    guardarFacultad: async (payload: any) => {
        const response = await saveData(payload)
        console.log(response)        
        set((state) => ({
            facultad: [...state.facultad, response.data.dato],
            responseTime : response.responseTime
        }))
        return response
    },
    eliminarFacultad: async (id: number) => {
        const response = await deleteData(id)
        console.log(response)
        set((state) => ({
            facultad : state.facultad.filter(el=>el.id !== id),
            responseTime : response.responseTime
        }))
        return response
    },
    actualizarFacultad: async (payload : any) => {
        const response = await updateData(payload)
        console.log(response)
        set((state) => ({
            facultad: state.facultad.map((el) => {
                if (el.id === payload.id) {
                    return {
                        ...el,
                        codigo : payload.codigo,
                        nombre: payload.nombre,
                        abreviatura: payload.abreviatura,
                        estado: payload.estadoAuditoria
                    }
                }
                return el
            }),
            responseTime : response.responseTime
        }))
        return response
    },
    filtrarFacultad : (busqueda : string) => {
        set(state=>({
            listaFiltrada : state.facultad.filter(el=> (el.codigo.includes(busqueda)) || (el.nombre.includes(busqueda)) || (el.abreviatura.includes(busqueda)))
        }))
    },
    cargarLista : () => {
        set(state=>({
            listaFiltrada : state.facultad
        }))
    }
}))