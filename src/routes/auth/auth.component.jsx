
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import { AuthContainer } from "./auth.styles";

const Auth = () =>{
    return(
        <AuthContainer>
            <SignIn />
            <SignUp/>
        </AuthContainer>
    );
}

export default Auth;