
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
        case "inverted":
            return InvertedButton;
        default:
            return BaseButton;
    }
}

const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (<CustomButton {...otherProps}>{children}</CustomButton>);
}

export default Button;