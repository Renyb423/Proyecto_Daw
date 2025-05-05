import axios from "axios";

const baseUrl = 'http://localhost:8080';

export const create = async ({ nombre, apellido, email, password, admin }) => {
    try {
        const response = await axios.post(baseUrl+"/api/users/register", {
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

export const login = async ({ nombre, password }) => {
    try {
        const response = await axios.post(baseUrl+"/login", {
            nombre,
            password,
        });
        return response.data; // Aquí normalmente recibes el JWT y/o info del usuario
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};