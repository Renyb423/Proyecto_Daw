import axios from "axios";

const baseUrl = 'http://localhost:8080/api/users/register';

export const create = async ({ nombre, apellido, email, password, admin }) => {
    try {
        const response = await axios.post(baseUrl, {
            nombre,
            apellido,
            email,
            password,
            admin,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}