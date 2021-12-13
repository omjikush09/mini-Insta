import axios from "axios"
import { getUser } from "../../user/helper/api"
import API from "./../../backend"
export const Upload=(file,username)=>{
    console.log(username)
    
    return axios.post(`https://api.cloudinary.com/v1_1/omji/image/upload`,file)
    .then(response=>{
        if(response.data.secure_url){
            var url=response.data.secure_url
            return UploadImageToDb(url,username).then(res=>{
                return res;
            })
        }else{
            return response.data
        }
    }).catch(e=>{
        if(e.respone){
            return e.respone
        }
        else{
            return e
        }
    })
}


export const SendImageUrlToDb=(id,url)=>{
    return  axios.post(`${API}/image/imageupload/${id}`,{url},{
                
        headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
        }
    }).then(res=>{
        return res.data
    }).catch(e=>{
        if(e.response){
            console.log(e.response)
            return e.respone.data
        }
        return e
    })
}



export const UploadImageToDb=(url,username)=>{
    console.log(username)
    //getting id from db
     return getUser(username).then(res =>{
       
        if(res._id){
            var id=res._id
            
            //Sending url to db to store
            return SendImageUrlToDb(id,url)

        }else if(res.data.error){
            return res.data
        }else{
            console.log(res)
        }
        
    })
    .catch(e=>{
        console.log(e)
        return {error:"Something went wrong"}
    })
}