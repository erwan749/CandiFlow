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

export const createApplication = async (applicationData) => {
    try {
        const response = await axios.post(API_URL, applicationData);
        return response.data;
    }
    catch(error){
        console.error("Erreur API POST : ", error);
        throw error;
    }
};