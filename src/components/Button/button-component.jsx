
import { 
        BaseButton, 
        GoogleSignInButton, 
        InvertedButton } 
        from "./button.styles";


export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google:"google-sign-in",
    inverted:"inverted",
}

const getButton = (buttonType = "base") => {
    switch(buttonType){
        case "google-sign-in":
            return GoogleSignInButton;
        break;
        case "inverted":
            return InvertedButton;
        break;
        default:
            return BaseButton;
        break;
    }
}

const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (<CustomButton {...otherProps}>{children}</CustomButton>);
}

export default Button;