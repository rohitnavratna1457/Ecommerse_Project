import { message } from 'antd'
import API from './Api'
import axios from "axios";
// import API_URL from '../Config/Config';


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

export const sellerRegister = async (values) => {
  const response = await API.post('account/seller_reg', values,
      { headers: { 'Content-Type': 'multipart/form-data' } }).catch(
          err => message.error('Registration Failed')
      )
  return response ? response.data : {}
} 

export const loginUser = async(values) => {
  const token = localStorage.getItem("access");
//   const user_type = localStorage.getItem("user_type");
//   console.log(user_type , 'user_type')
  console.log(values, token , '8**********')

  const response = await API.post('account/seller_login',values,
  {headers : 
    {
      'Content-Type':'application/json'
    
  }}).catch(
      err => message.error('regisration failed.')
  )
  return response ? response.data: {}
}
   

// Categories using to serrvice api -------

export const PostCategory = async (values) => {          
    // console.log("sevice_data",values);
    const response = await API.post('account/category', values,
        { headers: { 'Content-Type': 'application/json'} }).catch(
            err => message.error('Registration Failed')
        )
    return response ? response.data : {}
}

export const GettCategory = async (values) => {          
    // console.log("sevice_data",values);
    const response = await API.post('account/category', values,
        { headers: { 'Content-Type': 'application/json' } }).catch(
            err => message.error('Registration Failed')
        )
    return response ? response.data : {}
} 
export const GettCategoryGet = async (values) => {          
    // console.log("sevice_data",values);
    const response = await API.get('account/category', values,
        { headers: { 'Content-Type': 'application/json' } }).catch(
            err => message.error('Registration Failed')
        )
    return response ? response.data : {}
} 

export const DeleteCategory = async (productId) => {          
    const response = await API.delete(`account/category/${productId}`,
        { headers: { 'Content-Type': 'application/json' } }).catch(
            err => message.error('Deletion Failed')
        )
    return response ? response.data : {}
}


export const PostSubCategory = async (values) => {          
    console.log(values,'****** coreAPI *******');
    const response = await API.post('account/subCategory', values,
        { headers: { 'Content-Type': 'application/json'} }).catch(
            err => message.error('Registration Failed')
        )
    return response ? response.data : {}
}

export const GettSubCategory = async (values) => {          
    // console.log("sevice_data",values);
    const response = await API.get('account/subCategory', values,
        { headers: { 'Content-Type': 'application/json' } }).catch(
            err => message.error('Registration Failed')
        )
    return response ? response.data : {}
}

export const DeleteSubCategory = async (productId) => {          
    const response = await API.delete(`account/subCategory/${productId}`,
        { headers: { 'Content-Type': 'application/json' } }).catch(
            err => message.error('Deletion Failed')
        )
    return response ? response.data : {}
}


export const PostProduct = async (values) => {          
    console.log(values,'****** coreAPI *******');
    const response = await API.post('account/product', values,
        { headers: { 'Content-Type': 'multipart/form-data'} }).catch(
            err => message.error('Registration Failed')
        )
    return response ? response.data : {}
}

export const GetProduct = async (values) => {          
    // console.log("sevice_data",values);
    const response = await API.get('account/product', values,
        { headers: { 'Content-Type': 'multipart/form-data' } }).catch(
            err => message.error('Registration Failed')
        )
    return response ? response.data : {}
}

export const DeleteProduct = async (productId) => {          
    const response = await API.delete(`account/product/${productId}`,
        { headers: { 'Content-Type': 'application/json' } }).catch(
            err => message.error('Deletion Failed')
        )
    return response ? response.data : {}
}


// export const loginUser = async (values) => {
//   const token = localStorage.getItem("access"); // Replace with your actual token if required
//   console.log(values, token , '8**********')

//   try {
//     const response = await API.post(
//       'account/seller_login',
//       values,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`, // Include Bearer token
//         },
//       }
//     );
//     return response ? response.data : {};
//   } catch (err) {
//     console.error('Login API Error:', err);
//     message.error('Login failed. Please try again.');
//     return {};
//   }
// };
 
// export const getdata = async() => {
//     const response = await API.get(`api/productcategory/`,
//     {headers : {'Content-Type':'application/json'}}).catch(
//         err => message.error('regisration failed.')
//     )
//     return response ? response.data:{}
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



