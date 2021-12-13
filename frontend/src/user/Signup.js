import React, { useState } from "react"
import { Container, Form, FormGroup,Input,InputGroup,InputGroupText,Button,Col, Row } from "reactstrap";
import { signUp } from "./helper/api";
import {Navigate} from "react-router-dom"

const SignUp =()=>{
    const [values,setValues]=useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"123456789",
        dateOfBirth:Date,
        gender:"Male",
        error:'',
        success:"",
        redirectTime:-1
    })
    const {firstname,lastname,email,password,dateOfBirth,gender,error,success,redirectTime}=values;

    const handleChange=(event,name)=>{
        setValues({...values,[name]:event.target.value})
    }
    const submit = (e)=>{
        e.preventDefault()
          signUp({firstname,lastname,email,password,gender}).then(user=>{
              console.log(user)
                  if(user.error){
                setValues({...values,error:user.error,success:""})
            }else{
                console.log("hi")
                setValues({...values,success:"SignUp successfully",firstname:"",
                lastname:"",
                email:"",
                password:"",
                gender:"Male",
                error:'',
                redirectTime:3
                })
                setTimeout(() => {
                     setValues({...values,redirectTime:0})
                    console.log(redirectTime)
                }, 3000);
            }   
          }
        );
    }
   
    const NavigateToSign=()=>{
        if(redirectTime===0){
            return <Navigate to="/signin" />
        }
        return ""
    }
    const successMessage=()=>{
        if(success){
            return (
                <h1 className="text-white text-center" >{success}</h1>
                
            )
        } 
    } 
    const redirectMessage=()=>{
        if(redirectTime!==-1){
            return (
                <h1 className="text-white text-center" >Redirect in {redirectTime} sec </h1>
                
            )
        } 
    }   
    const errorMessage=()=>{
        if(error){
            return (
                <h1 className="text-white text-center" >Oops! {error}</h1>
            )
        } 
    } 
    return(
        <>
        <Container className="fluid">
            <Container className="bg-dark border p-5" style={{marginTop:"30vh"}} fluid="sm">
                {NavigateToSign()}
                { successMessage()}
                { errorMessage()}
                {redirectMessage()}
                <Form>
                <Row>
                <Col md={6}>
                <FormGroup inline >
                        <InputGroup>
                        <InputGroupText>
                          First Name
                            </InputGroupText>
                          <Input required onChange={(e)=>{ handleChange(e,"firstname")}} name="firstname" placeholder="Enter your First Name " type="text" value={firstname} />
                        </InputGroup>
                    </FormGroup>
                    
                    </Col >
                    <Col md={6} >
                    <FormGroup>
                        <InputGroup>
                        <InputGroupText>
                             Last Name
                            </InputGroupText>
                          <Input onChange={(e)=>{handleChange(e,"lastname")}} name="lastname" placeholder="Enter your Last Name" type="text" value={lastname} />
                        </InputGroup>
                    </FormGroup>
                   </Col>
                    </Row>
                    <FormGroup>
                        <InputGroup>
                        <InputGroupText>
                             Email
                            </InputGroupText>
                          <Input required onChange={(e)=>{handleChange(e,"email")}} name="email" placeholder="Enter your email" type="email" value={email} />
                        </InputGroup>
                    </FormGroup> 
                    <FormGroup>
                        <InputGroup>
                        <InputGroupText>
                            Password
                            </InputGroupText>
                          <Input required onChange={(e)=>{handleChange(e,"password")}} name="password" placeholder="Enter your password" type="password"  value={password}/>
                        </InputGroup>
                    </FormGroup>
                    <Row>
                    <Col md={6}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupText>
                                    Date of Birth
                                </InputGroupText>
                                <Input onChange={(e)=>{handleChange(e,"dateOfBirth")}} name="dateOfBirth" type="date" value={dateOfBirth} />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup inline >
                        <InputGroup>
                        <InputGroupText>
                            Gender
                            </InputGroupText>
                        <Input onChange={(e)=>{handleChange(e,"gender")}} name="gender" type="select" required value={gender}>
                            <option value="Male">
                                 Male
                             </option>
                            <option value="Female">
                                Female
                            </option>
                            <option value="Other">
                                Other
                            </option>
                            </Input>
                        </InputGroup>
                    </FormGroup>
                    </Col>    
                    </Row>
                    <div  style={{marginLeft:"45%"}}>
                    <Button color="primary" onClick={(e)=>{submit(e)}} >
                        Signin
                    </Button>
                </div>
                </Form>
            </Container>
            {/* <p>{JSON.stringify(values)}</p> */}
        </Container>
        </>
    )
}


export default SignUp;



