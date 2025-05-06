import axios from "axios";

const initProducts = [
    {
        id: 1,
        name: 'Monitor Samsung 65',
        price: 500,
        description: 'El monitor es increíble!'
    },
    {
        id: 2,
        name: 'IPhone 14',
        price: 800,
        description: 'El teléfono es muy bueno!'
    }
];

const baseUrl = 'http://localhost:8080/api/products';

// Solo para pruebas locales
export const listProduct = () => {
    return initProducts;
};

export const findAll = async (token) => {
    try {
        const response = await axios.get(baseUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error; // Esto hace que el error llegue al .catch del componente
    }
};

export const create = async ({ nombre, cantidad, precioCompra, precioVenta, proveedor, sku }) => {
    try {
        const token = localStorage.getItem('tokenJWT');
        if (!token) {
            throw new Error('No token found, please log in again.');
        }
        const response = await axios.post(
            baseUrl,
            { nombre, cantidad, precioCompra, precioVenta, proveedor, sku },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
};

export const update = async ({ id, nombre, cantidad, precioCompra, precioVenta, proveedor, sku }) => {
    try {
        if (!id) {
            throw new Error('El ID es obligatorio para actualizar');
        }
        const token = localStorage.getItem('tokenJWT');
        if (!token) {
            throw new Error('No token found, please log in again.');
        }
        const response = await axios.put(
            `${baseUrl}/${id}`,
            { nombre, cantidad, precioCompra, precioVenta, proveedor, sku },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        throw error;
    }
};


export const remove = async (id) => {
    try {
        if (!id) {
            throw new Error('El ID es obligatorio para eliminar');
        }
        const token = localStorage.getItem('tokenJWT');
        if (!token) {
            throw new Error('No token found, please log in again.');
        }
        await axios.delete(`${baseUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
    }
};
