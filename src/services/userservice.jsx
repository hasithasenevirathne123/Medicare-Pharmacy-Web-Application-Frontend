import {postData} from "../api/Methods/methods"


const UserLogin = async(email,password) => {
    const response = await postData("/user/login-user", {
        email:email,
        password:password,
    });

return response;

};

const UserRegister = async(data) => {
    const response = await postData("/user/save-customer",  data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

return response;

};

export{UserLogin,UserRegister}