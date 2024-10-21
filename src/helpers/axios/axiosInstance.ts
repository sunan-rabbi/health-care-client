import { getNewAccessToken, saveAccessToken } from "@/Service/actions/authservice";
import setAccessToken from "@/Service/actions/setAccessToken";
import { ResponseSuccessType } from "@/type";
import { getTokenFromLocal } from "@/utils/FormData/localStorage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;


instance.interceptors.request.use(
    function (config) {
        const accessToken = getTokenFromLocal('accessToken')
        if (accessToken) {
            config.headers.Authorization = accessToken
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });



instance.interceptors.response.use(
    //@ts-ignore
    function (response) {
        const responseObject: ResponseSuccessType = {
            data: response?.data?.data,
            meta: response?.data?.meta
        }
        return responseObject;
    }, async function (error) {

        const config = error.config;
        if (error?.response?.status === 500 && !(config?.sent)) {
            config.sent = true;
            const response = await getNewAccessToken() as any
            const accessToken = response?.data?.accessToken
            config.headers['Authorization'] = accessToken
            saveAccessToken({ accessToken: response?.data?.accessToken })
            setAccessToken(response?.data?.accessToken)
            return instance(config)
        } else {
            const responseObject = {
                statusCode: error?.response?.data?.statusCode || 500,
                message: error?.response?.data?.message || "Something went wrong!!!",
                errorMessage: error?.response?.data?.message
            }
            return responseObject;
        }


    })

export { instance }