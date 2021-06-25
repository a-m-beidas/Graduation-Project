import j from "jwt-decode";

const jwt = (key) => {
    const token = localStorage.getItem("bearer-token");
    if (token == undefined)
        return undefined;
    const user = j(token);
    return user[key];
}

export default jwt;