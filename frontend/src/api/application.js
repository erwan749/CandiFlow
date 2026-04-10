import axios from "axios";

const API_URL = "http://localhost:8080/api/applications";

export const getApplications = async () => {
    try{
        const response = await axios.get(API_URL);
        return response.data;
    }
    catch(error){
        console.error("Erreur API : " , error);
        return [];
    }
};