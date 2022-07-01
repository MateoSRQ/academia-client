import axios from 'axios'

axios.interceptors.request.use( x => {
    x.meta = x.meta || {}
    x.meta.requestStartedAt = new Date().getTime();
    return x;
})

axios.interceptors.response.use( x => {
//console.log(`Tiempo de ejecución: ${x.config.method} - ${ (new Date().getTime() - x.config.meta.requestStartedAt) / 1000 } seg`)
    x.responseTime = (new Date().getTime() - x.config.meta.requestStartedAt) / 1000 
        return x;
})

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