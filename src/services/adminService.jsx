import { getData, postData } from "../api/Methods/methods";


const getDashboardData = async(adminId) => {

    const response = await getData(`/admin/get-details-to-admin-dashboard/${adminId}`);
    return response;
}

// const savePrescriptionFile = async(data) =>{
//     const response = await postData(`/prescription/save-prescription`,data);
//     return response;
// }


// const getProductImage = async(ImageName) => {

//     const response = await getData(`/product/get-product-image/${ImageName}`);
//     return response;
// }

export {getDashboardData}
