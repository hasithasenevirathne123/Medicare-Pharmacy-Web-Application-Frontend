import { getData } from "../api/Methods/methods";



const getcustomerCount = async(adminId)=>{
const response = await getData(`/admin/get-details-to-admin-dashboard/${adminId}`);
return response;
}

export{getcustomerCount}