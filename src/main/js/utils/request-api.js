import axios from 'axios';

axios.head("/api/check", {
    headers : { Authorization: "Bearer " + localStorage.getItem("bearer-token") }
})
    .then(response => {
        if (response.status == 200) {
            setLoggedIn(true);
            setPending(false);
        } else {
            throw response;
        }
    })
    .catch(error => { 
        setLoggedIn(false); 
        setPending(false);
        localStorage.removeItem('bearer-token');
    })

function request(path, methodType, config, body, authorization, body, history, historyState, customFunction) {
    var request;
    if (headers == undefined) {
        config = { headers: { Authorization: "Bearer " + authorization }};
    } else {
        request = config[headers][Authorization] = "Bearer " + authorization;
    }

    if (methodType == "GET") {
        request = axios.get(path, config);
    } else if (methodType == "POST") {
        request = axios.post(path, body, config);
    } else if (methodType == "HEAD") {
        axios.head(path, config);
    }

    request
            .then(response => {
                if (response.status == 200) {
                    customFunction();
                }
            })
            .catch(error => {
                if (error.status == 500) {
                    history.push({ pathname: "/", state: historyState});
                } else if (error.status == 401) {
                    history.push({ pathname: "/", state: historyState});
                } else if (error.status == 403) {
                    history.push({ pathname: "/", state: historyState});
                } else if (error.status == 404) {
                    history.push({ pathname: "/", state: historyState});
                }
            });
}