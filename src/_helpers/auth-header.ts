export const authHeader = () => {

    // return authorization header with jwt token
    // @ts-ignore
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': `Bearer ${user.token}` };
    } else {
        return {};
    }
}
