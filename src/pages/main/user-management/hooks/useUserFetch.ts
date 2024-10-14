import axios from 'axios';

export default function useUserFetch() {
    const getUsers = async () => {
        const response = await axios.get("/api/users");
        const data = await response.data;
        return data
    }
    
    const getRoles = async () => {
        const response = await axios.get("/api/roles");
        const data = await response.data;
        return data
    }

    const getAccountTypes = async () => {
        const response = await axios.get("/api/account-types");
        const data = await response.data;
        return data
    }

    return {getUsers, getRoles, getAccountTypes}
}
