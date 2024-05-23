import axios from "axios";

export const sendGet = async (key) => {
    //let url = process.env.REACT_APP_SEND_GET_URL + key;
    let url = "http://127.0.0.1:18000/v1/transactions/" + key;
    try {
        const response = await axios.get(url);
        // console.log("Get response: ", response.data);
    }
    catch (error) {
        // console.error("Error: ", error);
    }
};


export const sendPost = async (key, value) => {
    let data = { "id": key, "value": value };
    //let url = process.env.REACT_APP_SEND_POST_URL;
    let url = "http://127.0.0.1:18000/v1/transactions/commit";
    try {
        const response = await axios.post(
            url,
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        // console.log("Get response: ", response.data);
    }
    catch (error) {
        // console.error("Error: ", error);
    }
};