import axios from 'axios'

export const fetchData = async () => {
    const url = 'https://prjboss.uap.edu.pe:8443/sisacademicopruebaback/api/v1/facultad'
    try {
        const response = await axios.get(url)
        return response
    } catch (error) {
        return error
    }
}

export const saveData = async (payload : any) => {
    const url = 'https://prjboss.uap.edu.pe:8443/sisacademicopruebaback/api/v1/facultad/add'
    try {
        const response = await axios.post(url,payload)
        return response
    } catch (error) {
        return error   
    }    
}

export const deleteData = async (id : number) => {
    const url =`https://prjboss.uap.edu.pe:8443/sisacademicopruebaback/api/v1/facultad/${id}/remove`
    try {
        const response = await axios.delete(url)
        return response
    } catch (error) {
        return error
    }
}

export const updateData = async (payload : any) => {
    const url =`https://prjboss.uap.edu.pe:8443/sisacademicopruebaback/api/v1/facultad/${payload.id}`
    try {
        const response = await axios.put(url,payload)
        return response
    } catch (error) {
        return error
    }
}