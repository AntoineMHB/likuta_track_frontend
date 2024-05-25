import axios from "axios";
import { toast } from "react-toastify";

const REST_API_BASE_URL = 'http://localhost:8080/users/signup';

export const registerUser = async (user, redirect) => {
    try {
        const response = await axios.post(REST_API_BASE_URL, user);
        console.log(response.data);
        toast.success("User registered successfully!");
        // here we delay the redirect to give time for the toast to display
        await new Promise((resolve) => setTimeout(resolve, 2000));
        redirect("/");
    } catch (error) {
        console.error("There was an error registering the user!", error);
        // in case of error, we display an error toast.
        toast.error("Failed to register user. Please try again later.");
    }
};
