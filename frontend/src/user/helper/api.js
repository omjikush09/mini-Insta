import Axios from "axios";
import API from "./../../backend"
export const signUp=({firstname,lastname,email,password,gender})=>{
    console.log(API)
    // console.log(JSON.stringify())
    return Axios.post(`${API}/signup`,{
        firstname,lastname,gender,password,email
    }).then(user=>{
        console.log(user.data)
        return user.data
    }).catch(e=>{
        console.log(e)
        try{
            console.log(e.response.data)
        }catch(error){
            console.log("nothing",error)
        }
        if(e.error){
            console.log(e.error.message)
        }
        if(e.response){
            return e.response.data
        }else{
            return {error:"Something went wrong"}
        }
    })
}

export const signIn=({email,password})=>{
    return Axios.post(`${API}/signin`,{email,password})
    .then(user =>{
        return user.data
    })
    .catch(e=>{
        if(e.response){
            return e.response.data
        }else{
            return {error:"Something went wrong"}
        }
    })
}

export const getUser=(username)=>{
    return Axios.get(`${API}/user/username/${username}`)
    .then(res=>{
        return res.data
    }).catch(e=>{
        if(e.response){
            return e.response.data
        }else{
            return {error:"Something went wrong"};
        }
    })
}

export const isauthentcated=()=>{
    if(typeof window =="undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}



export const authenticate =(data)=>{
    if(typeof window !=="undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
    }
}

// export const getUser=()=>{

// }