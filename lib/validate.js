export default function loginValidation(values){
    const errors={};
    //validation for email
    if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
    
    //validation for password
    if (!values.password){
        errors.password = "Required";
    }else if(values.password.length < 8 ||values.password.length >20){
        errors.password="Password length should be greater than 8 and less than 20"; 
    }else if(values.password.includes(" ")){
        errors.password="Invalid Password!!!"    
    }
    return errors;
    }

    export function registerValidation(values){
      const errors={};

      if(!values.username){
        errors.username = "Required";
      }else if(values.username.includes(" ")){
        errors.username = "Invalid Username"
      }

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      
      if (!values.password){
          errors.password = "Required";
      }else if(values.password.length < 8 ||values.password.length >20){
          errors.password="Password length should be greater than 8 and less than 20"; 
      }else if(values.password.includes(" ")){
          errors.password="Invalid Password!!!"    
      }

      if(!values.confirmPassword){
        errors.confirmPassword = "Required";
    } else if(values.password !== values.confirmPassword){
        errors.confirmPassword = "Password Not Match...!"
    } else if(values.confirmPassword.includes(" ")){
        errors.confirmPassword = "Invalid Confirm Password"
    }
    return errors
      
    }


