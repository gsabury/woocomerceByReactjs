import { useState } from "react";
import { 
        signInWithGooglePopup , 
        signInAuthUserWithEmailAndPassword
    } 
    from "../../utils/firebase/firebase.utils";
    
import FormInput from "../../components/form-inputs/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../../components/Button/button-component";

import { SignInContainer, ButtonsContainer } from "./sign-in.styles";


const defaultFormFields = {
    email:'',
    password:'',
}

const SignIn = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    
    const {email, password} = formFields;

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch(error.code){
                case "auth/wrong-password":
                    alert("The password is wrong");
                break;
                case "auth/user-not-found":
                    alert("User does not exist with that email")
                break;
                default:
                    alert("An error occured"+error);
                break;
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name] : value });
    }

    const signWithGoogle = async () => {
        await signInWithGooglePopup();
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
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}

export default SignIn;