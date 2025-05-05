import axios from "axios";

const initProducts = [
    {
        id: 1,
        name: 'Monitor Samsung 65',
        price: 500,
        description: 'El monitor es increible!'
    },
    {
        id: 2,
        name: 'IPhone 14',
        price: 800,
        description: 'El telefono es muy bueno!'
    }
];

const baseUrl = 'http://localhost:8080/products';

export const listProduct = () => {
    return initProducts;
}

export const findAll = async () => {
    try {
        return await axios.get(baseUrl);
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const create = async ({nombre, cantidad, precio_compra, precio_venta, proveedor, sku}) => {
    try {

        return await axios.post(baseUrl, {
            nombre,
            cantidad,
            precio_compra,
            precio_venta,
            proveedor,
            sku
        });
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export const update = async ({id, nombre, cantidad, precio_compra, precio_venta, proveedor, sku}) => {
    try {
        return await axios.put(`${baseUrl}/${id}`, {
            id,
            nombre,
            cantidad,
            precio_compra,
            precio_venta,
            proveedor,
            sku
        });
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export const remove = async(id) => {

    try {
        await axios.delete(`${baseUrl}/${id}`);   
    } catch (error) {
        console.log(error);
    }
}