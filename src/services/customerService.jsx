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

const getOrderData = async(data) => {
const response = await getData(`/order/place-order`,data);
return response;
}


// const getProductImage = async(ImageName) => {

//     const response = await getData(`/product/get-product-image/${ImageName}`);
//     return response;
// }

export {getAllProductsForCustomerDashboard,
    savePrescriptionFile,
    getPrescriptionInfo,
    getOrderData
}
