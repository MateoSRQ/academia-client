import create from "zustand"

interface UsuarioStore {
    username: string | null
    route: string
    data: {}
    autenticarUsuario: (payload: any) => void
}

export const useUsuarioStore = create<UsuarioStore>((set) => ({
    username: "Gustavo",
    route: "",
    data: {},
    autenticarUsuario: (payload: any) => {
        set({
            username: payload.username,            
            route: payload.ruta,
        })
    },
}))
