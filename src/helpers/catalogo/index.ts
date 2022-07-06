import axios from 'axios'
/*
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
*/
export const fetchData = async () => {

    const url_modalidad = `${import.meta.env.VITE_BACKEND_URL}/catalogo?estadoAuditoria=true&idCatalogoTipo=1`    
    const url_grado = `${import.meta.env.VITE_BACKEND_URL}/catalogo?estadoAuditoria=true&idCatalogoTipo=2`        
    const url_facultad = `${import.meta.env.VITE_BACKEND_URL}/facultad?estadoAuditoria=true`

    const req1 = axios.get(url_modalidad)
    const req2 = axios.get(url_grado)
    const req3 = axios.get(url_facultad)    

    try {
        const response = await axios.all([req1, req2, req3])
        console.log(response)
        return response
    } catch (error) {
        return error
    }
}