import { getData, postData } from "../api/Methods/methods";


const getAllProductsForCustomerDashboard = async(customerId) => {

    const response = await getData(`/customer/get-dashboard-details/${customerId}`);
    return response;
}

const savePrescriptionFile = async(data) =>{
    const response = await postData(`/prescription/save-prescription`,data);
    return response;
}


// const getProductImage = async(ImageName) => {

//     const response = await getData(`/product/get-product-image/${ImageName}`);
//     return response;
// }

export {getAllProductsForCustomerDashboard,savePrescriptionFile}
