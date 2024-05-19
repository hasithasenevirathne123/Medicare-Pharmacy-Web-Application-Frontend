import {postData} from "../api/Methods/methods"


const UserLogin = async(email,password) => {
    const response = await postData("/user/login-user", {
        email:email,
        password:password,
    });

return response;

};

export{UserLogin}