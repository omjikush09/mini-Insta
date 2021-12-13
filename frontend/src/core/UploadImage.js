import React  from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import {Modal,ModalBody,ModalHeader,Button,ModalFooter, Input,Alert,Spinner, Fade} from 'reactstrap'
import { Upload } from "./helper/api";
const UploadImage =({uploadimage,setUplaodimage})=>{

    const param=useParams()
    
    const [values,setValues]=useState({
        file:null,
        error:"",
        uploading:false,
        success:""
    })
    
    const {file,error,uploading ,success}=values;
    const handleChange=(e,name)=>{
        var formData =new FormData();
        if(name==="file"){
            formData.append("file",e.target.files[0])
            formData.append("upload_preset",process.env.REACT_APP_CLOUDINARY_PRESET)
            setValues({...values,file:formData})
        }else{    
        // setValues({...values,[name]:e.target.value})
        }

        }
    

    const submit=(e)=>{
        e.preventDefault();
        if(file===null){
          return (
            setValues({...values,error:"Please select file"})
          )
      }
        setValues({...values,uploading:true})
        Upload(file,param.username)
        .then((res)=>{
          if(res.error){
            setValues({...values,error:res.error,success:"",uploading:false})
          }else{
            setValues({...values,success:"Uploaded image successfully",error:"",uploading:false})
          }
        console.log((res)
        );
        }).catch(e=>{
            console.log(e)
        })
        
    }

    const successMessage=()=>{
      if(success){
        return (
          <div>
           <Alert color="success">
             {success}
          </Alert>
            </div>
        )}else{
          return ""
        }
    }
    const errorMessage=()=>{
      if(error){
        return (
          <div>
           <Alert color="danger">
             {error}
          </Alert>
            </div>
        )}else{
          return ""
        }
    }
    const spinner=()=>{
     
      if(uploading){
        return (
          <div className="text-center">
            <Spinner>
              Loading...
                </Spinner>
            </div>
        )}else{
          return ""
        }
    }


    return(
        <Modal isOpen={uploadimage}
        toggle={()=>setUplaodimage(!uploadimage)}
      >
        <ModalHeader toggle={()=>{setUplaodimage(!uploadimage)
        setValues({...values,error:"",success:"",uploading:false})
        }}>
          Create New Post
        </ModalHeader>
        <ModalBody>
          {spinner()}
          {successMessage()}
          {errorMessage()}
        <Input type="file" onChange={(e)=>handleChange(e,"file")}  />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={(e)=>submit(e)}
          >
            Upload Image
          </Button>
          {' '}
          <Button onClick={()=>{setUplaodimage(!uploadimage)
        setValues({...values,error:"",success:"",uploading:false})
        }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
}

export default UploadImage;