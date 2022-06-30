import axios from 'axios';


export const getSedes = async () => {

    const url = 'https://prjboss.uap.edu.pe:8443/sisacademicopruebaback/api/v1/sede/paginado?pageNumber=0&pageSize=5&sortDirection=ASC&sortBy=nombre&estadoAuditoria=tru';
    const response = await axios.get(url);

   try {
        const response = await axios.get(url);
        return response 
    }catch(error)
    {
       return error
    }
   
}