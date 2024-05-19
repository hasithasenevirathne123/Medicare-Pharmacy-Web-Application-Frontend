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

const addProduct = async(data) => {

    const response = await postData(`/admin/add-new-product`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

export {getDashboardData,getOrders,getCustomers,addProduct}
