import axios from "axios";

const getToken = () => localStorage.getItem("login");

export const GET = (path, config) => {
    let token = getToken();
    config = Object.assign({}, config, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
    return axios.get(path, config);
};

export const POST = (path,data, config) => {
    let token = getToken();
    config = Object.assign({}, config, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
    return axios.post(path, config);
};

export const PUT = (path,data, config) => {
    let token = getToken();
    config = Object.assign({}, config, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
    axios.put(path, config);
};

export const DELETE = (path, config) => {
    let token = getToken();
    config = Object.assign({}, config, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
    return axios.delete(path, config);
};
