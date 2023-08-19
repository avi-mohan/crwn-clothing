import { useState } from "react";

import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";

import "./sign-in-form.styles.scss"

const defaultFormFields = {
    email: '',
    password:'',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWIthGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            resetFormFields();
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);

        } catch(error){
            switch(error.code){
                case 'auth/wrongPassword':
                    alert('incorrect pasword for email');
                    break
                case 'auth/wrongPassword':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }          
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-up-contaimer">
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
            
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                    <div className="buttons-container">
                        <Button type="submit">Sign In</Button>
                        <Button type='button' buttonType='google' onClick={signInWIthGoogle}>Google Sign In</Button>
                    </div>
            </form>
        </div>
    )
}

export default SignInForm;