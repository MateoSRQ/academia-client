import create from "zustand"
import { fetchData } from "../helpers/carrera"

interface Carrera {
    id: number
    codigo: string
    nombre: string
    idFacultad: number
    idGradoEstudio: number
    idModalidad: number
    activo: true
    facultad : {}
}

interface CarreraStore {
    carrera : Carrera[]
    responseTime : string
    listarCarrera: () => void
}

export const useCarreraStore = create<CarreraStore>(set=>({
    carrera : [],
    responseTime : "",
    listarCarrera : async () => {
        const response = await fetchData()
        console.log(response)
        set({ carrera : response.data.content, responseTime : response.responseTime })
    }
}))

