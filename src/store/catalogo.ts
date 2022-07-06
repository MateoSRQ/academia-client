import create from "zustand"
import { fetchData } from "../helpers/catalogo"

interface CatalogoStore {
    catalogo: {
        grado: []
        modalidad: []
        sede: []
        facultad: []
    }
    listarCatalogo: () => void
}

export const useCatalogoStore = create<CatalogoStore>((set) => ({
    catalogo: { grado: [], modalidad: [], sede: [], facultad: [] },
    listarCatalogo: async () => {
        const response = await fetchData()
        set({
            catalogo :{
                grado: response[0].data,
                modalidad: response[1].data,
                sede: [],
                facultad: response[2].data                
            }
        })
    },
}))
