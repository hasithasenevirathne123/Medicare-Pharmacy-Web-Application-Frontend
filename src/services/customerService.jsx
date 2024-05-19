import { getData, postData } from "../api/Methods/methods";


const getAllProductsForCustomerDashboard = async(customerId) => {

    const response = await getData(`/customer/get-dashboard-details/${customerId}`);
    return response;
}

const savePrescriptionFile = async(data) =>{
    const response = await postData(`/prescription/save-prescription`,data);
    return response;
}

const getPrescriptionInfo = async(customerId) => {
    const response = await getData(`/prescription/get-user-prescription/${customerId}`);
    return response;
}

const getOrderData = async(customerId) => {
const response = await getData(`/order/get-user-orders/${customerId}`);
return response;
}


const buyOrder = async(data)=>{
const response = await postData(`/order/place-order`,data);
return response;
}

const getCategoryImage = async(imageName) => {
    const response = await(`/category/get-category-image/${imageName}`);
    return response;
}




export {getAllProductsForCustomerDashboard,
    savePrescriptionFile,
    getPrescriptionInfo,
    getOrderData,
    buyOrder,
    getCategoryImage
}
