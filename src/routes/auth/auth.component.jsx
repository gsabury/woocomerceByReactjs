
import SignIn from "../sign-in/sign-in.component";
import SignUp from "../sign-up/sign-up.component";
import './auth.styles.scss';

// import Counter from "../../components/reducerHook/counter/counter.component";

// import Todo from "../../components/reducerHook/todo/todo.component";

const Auth = () =>{
    return(
        <div className="auth-container">
            <SignIn />
            <SignUp/>

            {/* <Counter/> */}

            {/* <Todo/> */}

        </div>
    );
}

export default Auth;