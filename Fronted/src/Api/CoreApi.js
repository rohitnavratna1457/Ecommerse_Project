import { message } from 'antd'
import API from './Api'
import axios from "axios";
// export const EmpLogin = async (values) => {
//     const response = await API.post('api/login', values,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// }

export const PostSignUp = async (values) => {
    const response = await API.post('api/signUp', values,
        { headers: { 'Content-Type': 'multipart/form-data' } }).catch(
            err => message.error('Registration Failed')
        )
    return response ? response.data : {}
} 

export const getlogin = async(values) => {
    console.log(values)
    const response = await API.post(`api/login/`,values,
    {headers : {'Content-Type':'application/json'}}).catch(
        err => message.error('regisration failed.')
    )
    return response ? response.data: {}
}
 
// export const getdata = async() => {
//     const response = await API.get(`api/productcategory/`,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data:{}
// }

// export const HealthCheckupp = async (values) => {          
//     // console.log("sevice_data",values);
//     const response = await API.post('api/HealthCheckup/', values,
//         { headers: { 'Content-Type': 'application/json'} }).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// }

// export const ConsultOnlineApp = async (values) => {          
//     // console.log("sevice_data",values);
//     const response = await API.post('api/ConsultOnline/', values,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// }

// export const ProductPostApi = async (values) => {          
//     console.log("sevice_data",values);
//     const response = await API.post('api/productdata/', values,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// }  

// export const Contactform = async (values) => {          
//     console.log("sevice_data",values);
//     const response = await API.post('api/contactform/', values,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// }

// export const RegisterForm = async (values) => {          
//     console.log("sevice_data",values);
//     const response = await API.post('api/RegisterForm/', values,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// }

// export const Loginapi = async (values) => {  
            
//     console.log("sevice_data",values);
//     const response = await API.post('api/Loginapi/', values,
//         { headers: { 'Content-Type': 'application/json'} }).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// } 

// export const ProtectedViewdata = async (values) => {  
            
//     console.log("sevice_data",values);
//     const response = await API.get('api/ProtectedView/', values,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// } 
// export const ForgotPasswordApi = async (values) => {  
            
//     console.log("sevice_data",values);
//     const response = await API.post('api/ForgotPassworddata/', values,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// } 

// export const ResetPasswordApi = async (values) => {  
            
//     console.log("sevice_data",values);
//     const response = await API.post('api/ResetPassworddata/', values,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// } 



// export const Postdoctor = async (values) => {  
            
//     console.log("sevice_data",values);
//     const response = await API.post('api/Postdoctor/', values,
//         { headers: { 'Content-Type': 'application/json'}}).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// }

// export const getDocterlist = async() => {
//     const response = await API.get(`api/getdocter/`,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data: {}
// }

// export const deleteDoctor = async (id) => {
//     try {
//       const response = await API.delete(`api/doctorsdelete/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting doctor:", error);
//       return error.response ? error.response.data : {};
//     }
//   };
  

//    export const DoctorUpdateWithId = async (id, putData) => {
//         const response = await API.put(`api/updatedata/${id}`, putData,
//             { headers: { 'Content-Type': 'application/json' } }).catch(
//                 err => message.error('Not Fetch')
//             )
//         return response ? response.data : {}
    
//     } 


//     // export const getDoctorCount = async () => {
//     //     try {
//     //         const response = await API.get('api/doctors/count');
//     //         return response.data.count;
//     //     } catch (error) {
//     //         message.error('Failed to fetch doctor count');
//     //         console.error('Error in getDoctorCount:', error);
//     //         return 0;  // Return 0 in case of an error
//     //     }
//     // };

//  //// GET
// export const getPatientlist = async() => {
//     const response = await API.get(`api/getpatient/`,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data: {}
// }
// export const Postpatient = async (values) => {  
//     console.log("sevice_data",values);
//     const response = await API.post('api/patient/', values,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// }  

// export const PatientUpdatedata = async (putData,id) => {
//     console.log(id,'@@@@id')
//     console.log( putData,'4566')
//     const response = await API.put(`api/Patientupdatedata/${id}`, putData,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Not Fetch')
//         )
//     return response ? response.data : {}

// } 

// export const PatientDoctordelete = async (id) => {
//     try {
//       const response = await API.delete(`api/Patientdeletedata/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting doctor:", error);
//       return error.response ? error.response.data : {};
//     }
//   };

// //   export const getPatientCount = async () => {
// //     try {
// //         const response = await API.get('api/Patient/count');
// //         return response.data.count;
// //     } catch (error) {
// //         message.error('Failed to fetch doctor count');
// //         console.error('Error in getDoctorCount:', error);
// //         return 0;  // Return 0 in case of an error
// //     }
// // };



// /////  doctorSchedule
// export const getdoctorSchedulelist = async() => {
//     const response = await API.get(`api/getdoctorSchedule/`,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data: {}
// }
// export const PostdoctorSchedule = async (values) => {  
//     console.log("sevice_data",values);
//     const response = await API.post(`api/postdoctorSchedule/`, values,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// }   

// export const  updateSchedule = async (putData, id) => {
//     console.log(id,'@@@@id')
//     console.log( putData,'4566')
    
//     const response = await API.put(`api/updatedataschedule/${id}`, putData,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Not Fetch')
//         )
    
//     return response ? response.data : {}

// }  

// export const  Scheduledelete = async (id) => {
//     try {
//       const response = await API.delete(`api/deleteSchedule/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting doctor:", error);
//       return error.response ? error.response.data : {};
//     }
//   }; 

// //   export const Scheduledelete = async (id) => {
// //     try {
// //       const response = await axios.delete(`api/Scheduledeletedata/${id}`);
// //       return response.data;
// //     } catch (error) {
// //       console.error("Error deleting doctor:", error);
// //       return error.response ? error.response.data : {};
// //     }
// //   };

// //   export const getScheduleCount = async () => {
// //     try {
// //         const response = await API.get('api/Schedule/count');
// //         return response.data.count;
// //     } catch (error) {
// //         message.error('Failed to fetch doctor count');
// //         console.error('Error in getDoctorCount:', error);
// //         return 0;  // Return 0 in case of an error
// //     }
// // };

// //feedback  
// export const Postfeedbacklist = async (values) => {  
//     console.log("sevice_data",values);
//     const response = await API.post(`api/postfeedbackdata/`, values,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Registration Failed')
//         )
//     return response ? response.data : {}
// }   
// export const getfeedbacklist = async() => {
//     const response = await API.get(`api/getfeedbackdata/`,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data: {}
// }
// // export const Postfeedbacklist = async (values) => {  
// //     console.log("sevice_data",values);
// //     const response = await API.post(`api/postfeedbackdata/`, values,
// //         { headers: { 'Content-Type': 'application/json' } }).catch(
// //             err => message.error('Registration Failed')
// //         )
// //     return response ? response.data : {}
// // }   

 


// // export const inventoryUpdateWithId = async (id, putData) => {
// //     const response = await API.put(`api/productdata/${id}`, putData,
// //         { headers: { 'Content-Type': 'application/json' } }).catch(
// //             err => message.error('Not Fetch')
// //         )
// //     return response ? response.data : {}

// // }
// // export const ProductCategoryApi = async() => {
// //     const response = await API.get(`api/productcategory/`,
// //     {headers : {'Content-Type':'application/json'}}).catch(
// //         err => message.error('regisration failed.')
// //     )
// //     return response ? response.data: {}
// // }

// // export const getMeasurementApi = async() => {
// //     const response = await API.get(`api/getmeasurement/`,
// //     {headers : {'Content-Type':'application/json'}}).catch(
// //         err => message.error('regisration failed.')
// //     )
// //     return response ? response.data: {}
// // }

// // export const getGstRateApi = async() => {
// //     const response = await API.get(`api/getgstrate/`,
// //     {headers : {'Content-Type':'application/json'}}).catch(
// //         err => message.error('regisration failed.')
// //     )
// //     return response ? response.data: {}
// // }


// // export const ProductdataTcategoryNameApi = async(formData) => {
// //     const response = await API.post(`api/getProductDataC/`,formData,
// //     {headers : {'Content-Type':'application/json'}}).catch(
// //         err => message.error('regisration failed.')
// //     )
// //     return response ? response.data: {}
// // }

// // export const ProductCompanyApi = async(formData) => {
// //     // alert()
// //     const response = await API.post(`api/productcompany/`,formData,
// //     {headers : {'Content-Type':'application/json'}}).catch(
// //         err => message.error('regisration failed.')
// //     )
// //     return response ? response.data: {}
// // }

// // export const GetProductApi = async(formData) => {
// //     const response = await API.post(`api/getPdataTcompany/`,formData,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data: {}
// }


// export const inventoryGetdata = async () => {
//     const response = await API.get('api/productdata',
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Not Fetch')
//         )
//     return response ? response.data : {}

// }


// export const inventoryDelete = async (id) => {

//     const response = await API.delete(`api/productdata/${id}`,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Not delete')
//         )
//     return response ? response.data : {}
// }


// export const inventoryGetdataWithId = async (id) => {
//     const response = await API.get(`api/productdata/${id}`,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Not Fetch')
//         )
//     return response ? response.data : {}
// }


// export const inventoryUpdateWithId = async (id, putData) => {
//     const response = await API.put(`api/productdata/${id}`, putData,
//         { headers: { 'Content-Type': 'application/json' } }).catch(
//             err => message.error('Not Fetch')
//         )
//     return response ? response.data : {}

// }


// export const Add_New_Company = async(formData) => {
//     const response = await API.post(`api/addcompany/`,formData,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data: {}
// }

// export const Get_Company_Name = async() => {
//     const response = await API.get(`api/addcompany/`,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data: {}
// }


// export const Add_New_Category = async(formData) => {
//     const response = await API.post(`api/addcategory/`,formData,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data: {}
// }

// export const Add_New_Company_in_model = async(formData) => {
//     console.log("mama" , formData);
//     const response = await API.post(`api/addcompany/`,formData,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data: {}
// }


// // purchase invoice page

// export const getProductNameApi = async(formData) => {
//     // alert()
//     const response = await API.post(`api/getProductDataPurchaseInvoice/`,formData,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data: {}
// }

// export const getProductDataApi = async(formData) => {
//     // alert()
//     const response = await API.post(`api/getProductName/`,formData,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data: {}
// }


// export const getProductDataCalculation = async(formData) => {
//     // alert()
//     const response = await API.post(`api/calculation/`,formData,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data: {}
// }




// export const ProductSearchApi = async(formData) => {
//     // alert()
//     const response = await API.post(`search/`,formData,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data: {}
// }

