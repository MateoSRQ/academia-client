import create from "zustand"
import { deleteData, fetchData, saveData, updateData } from "../helpers/carrera"

interface Carrera {
    id: number
    codigo: string
    nombre: string
    idFacultad: number
    idGradoEstudio: number
    idModalidad: number
    activo: true
    facultad : {}
    sedes : [
        {codigo : string,
        nombre : string}
    ]
}

interface CarreraStore {
    carrera : Carrera[]
    responseTime : string
    listarCarrera: () => void
    guardarCarrera: (payload: any) => {}
    eliminarCarrera: (id: number) => {}
    actualizarCarrera: (payload: any) => {}

}

export const useCarreraStore = create<CarreraStore>(set=>({
    carrera : [],
    responseTime : "",
    listarCarrera : async () => {
        const response = await fetchData()        
        set({ carrera : response.data.content, responseTime : response.responseTime , })
    },
    guardarCarrera: async (payload: any) => {
        const response = await saveData(payload)
        console.log(response)        
        set((state) => ({
            carrera: [...state.carrera, response.data.dato],
            responseTime : response.responseTime
        }))
        return response
    },
    eliminarCarrera: async (id: number) => {
        const response = await deleteData(id)
        console.log(response)
        set((state) => ({
            carrera : state.carrera.filter(el=>el.id !== id),
            responseTime : response.responseTime
        }))
        return response
    },
    actualizarCarrera: async (payload : any) => {
        const response = await updateData(payload)
        console.log(response)
        set((state) => ({
            carrera: state.carrera.map((el) => {
                if (el.id === payload.id) {
                    return {
                        ...el,
                        codigo : payload.codigo,
                        nombre: payload.nombre,
                        activo: payload.activo
                    }
                }
                return el
            }),
            responseTime : response.responseTime
        }))
        return response
    },
}))

