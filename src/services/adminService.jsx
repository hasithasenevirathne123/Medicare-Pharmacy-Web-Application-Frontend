<<<<<<< HEAD
import { getData } from "../api/Methods/methods";



const getcustomerCount = async(adminId)=>{
const response = await getData(`/admin/get-details-to-admin-dashboard/${adminId}`);
return response;
}

export{getcustomerCount}
=======
import { getData, postData } from "../api/Methods/methods";


const getDashboardData = async(adminId) => {

    const response = await getData(`/admin/get-details-to-admin-dashboard/${adminId}`);
    return response;
}

const getOrders = async() => {

    const response = await getData(`/admin/get-all-orders`);
    return response;
}

const getCustomers = async() => {

    const response = await getData(`/admin/get-all-customers`);
    return response;
}

export {getDashboardData,getOrders,getCustomers}
>>>>>>> d19096fdcbf1e0684f553e5d731ecc9d48fb24d5
