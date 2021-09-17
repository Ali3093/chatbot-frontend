import { auth} from "./firebase";

export const islogin = () => {
    if(auth.currentUser)
    return true;
}