import React from 'react'
import { useState,useEffect } from 'react'
import { Getsellerdata,UpdateSellerData } from '../../../Api/CoreApi'
function Seller_Kyc() {
    const [data, setData]= useState([])
    console.log(data,'**** data ****')

    const get_seller = async()=>{
        const response = await Getsellerdata()
        setData(response)
    }

    useEffect(()=>{
        get_seller()
    },[])

    const send = async (value) => {
    const seller_id = parseInt(value.user_id, 10);
    const updatedProduct = { ...value, admin_approve: "Request" };
    const response = await UpdateSellerData(seller_id, updatedProduct);
  };
  return (
    <div>
        {data.map(i=>(
            <>
            <p>{i.name}</p>
            <p>{i.admin_approve}</p>
            <button onClick={()=>send(i)}>KYC Request</button>
            </>
        ))}
      
    </div>
  )
}

export default Seller_Kyc
