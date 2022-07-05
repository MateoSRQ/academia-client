import axios from 'axios'

axios.interceptors.request.use( x => {
    x.meta = x.meta || {}
    x.meta.requestStartedAt = new Date().getTime();
    return x;
})

axios.interceptors.response.use( x => {
    const time = (new Date().getTime() - x.config.meta.requestStartedAt) / 1000 
    x.responseTime = time.toFixed(2)
        return x;
})

export const fetchData = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/carrera/paginado?pageNumber=0&sortDirection=ASC&estadoAuditoria=true&pageSize=100&sortBy=nombre`    
    try {
        const response = await axios.get(url)
        return response
    } catch (error) {
        return error
    }
}
/*
export const saveData = async (payload : any) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/facultad/add`  
    try {
        const response = await axios.post(url,payload)
        return response
    } catch (error) {
        return error   
    }    
}

export const deleteData = async (id : number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/facultad/${id}/remove`
    try {
        const response = await axios.delete(url)
        return response
    } catch (error) {
        return error
    }
}

export const updateData = async (payload : any) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/facultad/${payload.id}`
    try {
        const response = await axios.put(url,payload)
        return response
    } catch (error) {
        return error
    }
}
*/
