export function decodeToken(token) {
    try {
        const payload = token.split('.')[1];
        //se decodifica en base 64
        const decoded = JSON.parse(atob(payload));
        return decoded;
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return null;
    }
}