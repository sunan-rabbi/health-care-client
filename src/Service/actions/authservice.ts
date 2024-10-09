import { instance } from "@/helpers/axios/axiosInstance";
import { JwtDecodedData } from "@/type";
import { getTokenFromLocal, removeTokenFromLocal, setTokenInLocal } from "@/utils/FormData/localStorage";
import { jwtDecode } from "jwt-decode"

const key = 'accessToken';

// Function to save access token
export const saveAccessToken = async (data: { accessToken: string }) => {
    return setTokenInLocal(key, data.accessToken);
};

// Function to remove access token
export const removeAccessToken = () => {
    return removeTokenFromLocal(key);
};

// Function to check if a token is a valid JWT
export const isValidJwt = (token: string): boolean => {
    const parts = token.split('.');

    if (parts?.length !== 3) {
        return false; // Invalid token structure
    }

    try {
        const decoded = jwtDecode(token); // Try decoding the token
        return !!decoded;
    } catch (error) {
        console.error("Invalid JWT token:", error);
        return false;
    }
};

// Function to get user info from token
export const getUserInfo = () => {
    const token = getTokenFromLocal(key);

    if (!token) {
        console.error("Token is missing");
        return null;
    }

    if (!isValidJwt(token)) {
        console.error("Invalid token detected, removing from local storage");
        removeAccessToken(); // Remove invalid token
        return null;
    }

    let decoded: JwtDecodedData | null = null;

    try {
        decoded = jwtDecode(token as string); // Decode the token
    } catch (error) {
        console.error("Failed to decode the token:", error);
        removeAccessToken(); // Remove token if decoding fails
        return null;
    }

    return decoded; // Return decoded data if successful
};

// Function to check if user is logged in
export const isLoggedIn = (): boolean => {
    const authToken = getTokenFromLocal(key);

    // Check if token exists and is valid
    if (authToken && isValidJwt(authToken)) {
        return true;
    }

    // If token is invalid or missing, remove it and return false
    removeAccessToken();
    return false;
};

// Function to get new access token using refresh token
export const getNewAccessToken = async () => {
    return await instance({
        url: 'http://localhost:5000/api/v1/auth/refresh-token',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });
};
