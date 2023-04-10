import { useState } from "react";

import { useDispatch } from 'react-redux';

import FormInput from "../../components/form-inputs/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../../components/Button/button-component";

import { SignInContainer, ButtonsContainer } from "./sign-in.styles";

import {
    googleSignInStart,
    emailSignInStart,
  } from '../../store/user/user.action';

const defaultFormFields = {
    email:'',
    password:'',
}

const SignIn = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const dispatch = useDispatch();

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
          } catch (error) {
            console.log('user sign in failed', error);
          }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name] : value });
    }

    return (
        <SignInContainer>
            <h2>have account ?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                
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

                <ButtonsContainer>
                    <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}

export default SignIn;