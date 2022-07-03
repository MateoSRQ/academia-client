import create from "zustand"

interface UsuarioStore {
    usuario: {
        nombre: string
        estado: boolean
        rutaInicial: string
    }
    autenticarUsuario: (payload: any) => void
}

export const useUsuarioStore = create<UsuarioStore>((set) => ({
    usuario: {
        nombre: "",
        estado: false,
        rutaInicial: "",
    },
    autenticarUsuario: (payload: any) => {
        set({
            usuario: {
                nombre: payload.username,
                estado: true,
                rutaInicial: payload.ruta,
            },
        })
    },
}))
