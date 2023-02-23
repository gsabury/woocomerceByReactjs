
import SignIn from "../sign-in/sign-in.component";
import SignUp from "../sign-up/sign-up.component";
import './auth.styles.scss';

const Auth = () =>{
    return(
        <div className="auth-container">
            <SignIn />
            <SignUp/>
        </div>
    );
}

export default Auth;