
import { useState } from "react";

import { useDispatch } from 'react-redux';

import { 
    createAuthUserWithEmailAndPassword , 
    createUserDocumentFromAuth } 
    from "../../utils/firebase/firebase.utils";

import FormInput from "../../components/form-inputs/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../../components/Button/button-component";

import { SignUpContainer } from "./sign-up.styles";

import { signUpStart } from '../../store/user/user.action';

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const SignUp = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const dispatch = useDispatch();

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
          } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
              alert('Cannot create user, email already in use');
            } else {
              console.log('user creation encountered an error', error);
            }
          }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name] : value });
    }

    return (
        <SignUpContainer>
            <h2>Dont't have account ?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Dispaly Name" 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName"
                    value={displayName}/>
               
                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}/>

                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}/>

              
                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}/>

                <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>Sign UP</Button>
            </form>
        </SignUpContainer>
    );
}

export default SignUp;