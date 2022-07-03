import create from "zustand"
import { deleteData, fetchData, saveData, updateData } from "../helpers/facultad"

interface Facultad {    
    id: number
    codigo: string
    nombre: string
    abreviatura: string
    estadoAuditoria : boolean
}

interface FacultadStore {
    facultad: Facultad[]
    listarFacultad: () => {}
    guardarFacultad: (payload: any) => {}
    eliminarFacultad: (id: number) => {}
    actualizarFacultad: (payload: any) => {}
}

export const useFacultadStore = create<FacultadStore>((set) => ({
    facultad: [],
    listarFacultad: async () => {
        const response = await fetchData()
        console.log(response)        
        set({ facultad: response.data })
        return response
    },
    guardarFacultad: async (payload: any) => {
        const response = await saveData(payload)
        console.log(response)        
        set((state) => ({
            facultad: [...state.facultad, response.data.dato],
        }))
        return response
    },
    eliminarFacultad: async (id: number) => {
        const response = await deleteData(id)
        console.log(response)
        set((state) => ({
            facultad : state.facultad.filter(el=>el.id !== id)
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
        }))
        return response
    },
}))
