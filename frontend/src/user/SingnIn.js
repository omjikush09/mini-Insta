import React, { useState } from "react"
import { Container, Form, FormGroup,Input,InputGroup,InputGroupText,Button } from "reactstrap";
import { authenticate, signIn } from "./helper/api";
import {useNavigate} from "react-router-dom"

const SignIn =()=>{

    const navigate= useNavigate()
    const [values,setValues] =useState({
        email:"omjikush09@gmail.com",
        password:"123456789",
        success:"",
        error:"",
        redirect:false
    })

    const {email,password,success,error,redirect}=values;
    
    const handleChange=(event,name)=>{
        setValues({...values,[name]:event.target.value})
    }
    const submit=(e)=>{
        e.preventDefault();
        signIn({email,password}).then(user=>{
            if(user.error){
                setValues({...values,error:user.error,success:""})
            }else{
                setValues({...values,success:"SignIn successfully",firstname:"",
                lastname:"",
                email:"",
                password:"",
                gender:"Male",
                error:'',
                redirectTime:3
                })
                if(user.token){
                    authenticate(user.token)
                    }
               
                setTimeout(() => {
                    navigate(`/${user.user.username}`)
                }, 1000);
            }
        })
    }


    const successMessage=()=>{
        if(success){
            return <h1 className="text-white">{success}</h1>
        } 
    }
    const errorMessage=()=>{
        if(error){
            return <h1 className="text-white">{error}</h1>
        } 
    }
    
    return(
        <>
             <Container className="fluid">
             <Container className="bg-dark border p-5" style={{marginTop:"30vh"}} fluid="sm">
                 {successMessage()}
                 {errorMessage()}
                 <Form>
                     <FormGroup className="mt-16">
                         <InputGroup>
                         <InputGroupText>
                              Email
                             </InputGroupText>
                           <Input  name="email" onChange={(e)=>{handleChange(e,"email")}} placeholder="Enter your email" type="email" value={email} />
                         </InputGroup>
                     </FormGroup>
                     <FormGroup>
                         <InputGroup>
                         <InputGroupText>
                             Password
                             </InputGroupText>
                           <Input name="password" onChange={(e)=>{handleChange(e,"password")}} placeholder="Enter your password" type="password" value={password} />
                         </InputGroup>
                     </FormGroup>
                     <div  style={{marginLeft:"45%"}}>
                     <Button color="primary" onClick={(e)=>submit(e)} >
                         Signin
                     </Button>
                 </div>
                 </Form>
             </Container>
         </Container>
        </>
    )
}


export default SignIn;



