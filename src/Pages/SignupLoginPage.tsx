import { Button } from "@mui/material"
import { auth, googleProvider } from "../config/firebase"
import { signInWithPopup, signOut } from "firebase/auth"

const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);

    } catch (err) {
        console.error(err);
    }
}

const logout = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.error(err);
    }
}


const SignupLoginPage = () => {


    return (<>
        <Button onClick={() => { signInWithGoogle() }}>Signup/Login with google</Button>
        <Button onClick={() => { logout() }}>Logout</Button>
        <Button onClick={() => { console.log(auth.currentUser?.email)}}>check email of current user</Button>
    </>)
}

export default SignupLoginPage