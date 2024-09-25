export const ENV_MODE = import.meta.env.MODE;

const version: string = 'v1';

const SERVER_BASE = {
    production: import.meta.env.VITE_APP_HOSTED_SERVER,
    staging: import.meta.env.VITE_APP_LOCAL_SERVER_BASE_URL,
    development: import.meta.env.VITE_APP_HOSTED_SERVER_DEV
}[ENV_MODE] || import.meta.env.VITE_APP_HOSTED_SERVER_DEV;
console.log(SERVER_BASE)

const LOGIN_URL = {
    production: import.meta.env.VITE_APP_USER_LOGIN,
    staging: import.meta.env.VITE_APP_USER_LOGIN,
    development: import.meta.env.VITE_APP_USER_LOGIN
}[ENV_MODE] || import.meta.env.VITE_APP_USER_LOGIN;

const REGISTRATION_URL = {
    production: import.meta.env.VITE_APP_USER_REGISTER_PROD,
    staging: import.meta.env.VITE_APP_USER_REGISTER,
    development: import.meta.env.VITE_APP_USER_REGISTER_DEV
}[ENV_MODE] || import.meta.env.VITE_APP_USER_REGISTER_DEV;

const RESEND_OTP_REQUEST = {
    production: import.meta.env.VITE_APP_USER_REVERIFICATION_PROD,
    staging: import.meta.env.VITE_APP_USER_REVERIFICATION,
    development: import.meta.env.VITE_APP_USER_REVERIFICATION_DEV
}[ENV_MODE] || import.meta.env.VITE_APP_USER_REVERIFICATION_DEV;

const OTP_AUTHENTICATION = {
    production: import.meta.env.VITE_APP_USER_OTP_PROD,
    staging: import.meta.env.VITE_APP_USER_OTP,
    development: import.meta.env.VITE_APP_USER_OTP_DEV
}[ENV_MODE] || import.meta.env.VITE_APP_USER_OTP_DEV;

const RESET_PASSWORD = {
    production: import.meta.env.VITE_APP_RESET_SECURITY_CODE_PROD,
    staging: import.meta.env.VITE_APP_RESET_SECURITY_CODE,
    development: import.meta.env.VITE_APP_RESET_SECURITY_CODE_DEV
}[ENV_MODE] || import.meta.env.VITE_APP_RESET_SECURITY_CODE_DEV;


export const LOGIN_SESSION = async(data_binding: any) : Promise<any> => ({
    url: `${SERVER_BASE}/api/${version}/${LOGIN_URL}`,
    method: 'POST',
    data: data_binding,
})
export const REGISTER_SESSION = async(data_binding: any)  : Promise<any>  => ({
    url: `${SERVER_BASE}/api/${version}/${REGISTRATION_URL}`,
    method: 'POST',
    data: data_binding
})

export const RESEND_OTP_AUTH = async(data_binding : any)  : Promise<any> =>({
    url: `${SERVER_BASE}/api/${version}/${RESEND_OTP_REQUEST}`,
    method: 'POST',
    data: data_binding
})
export const OTP_VERIFICATION = async(data_binding : any)   : Promise<any> =>({
    url: `${SERVER_BASE}/api/${version}/${OTP_AUTHENTICATION}`,
    method: 'POST',
    data: data_binding
})
export const RESET_SECURITY_CODE = async(data_binding : any)  :  Promise<any> =>({
    url: `${SERVER_BASE}/api/${version}/${RESET_PASSWORD}`,
    method: 'POST',
    data: data_binding
})