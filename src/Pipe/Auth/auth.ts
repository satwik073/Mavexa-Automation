export const ENV_VALIDATOR: boolean = import.meta.env.DEV;
const version: any = 'v1'
const SERVER_BASE = ENV_VALIDATOR
    ? import.meta.env.VITE_APP_HOSTED_SERVER
    : import.meta.env.VITE_APP_HOSTED_SERVER;

const LOGIN_URL = ENV_VALIDATOR
    ? import.meta.env.VITE_APP_USER_LOGIN
    : import.meta.env.VITE_APP_USER_LOGIN

const REGISTRATION_URL = ENV_VALIDATOR
    ? import.meta.env.VITE_APP_USER_REGISTER
    : import.meta.env.VITE_APP_USER_REGISTER

const RESEND_OTP_REQUEST = ENV_VALIDATOR
    ? import.meta.env.VITE_APP_USER_REVERIFICATION
    : import.meta.env.VITE_APP_USER_REVERIFICATION

const OTP_AUTHENTICATION = ENV_VALIDATOR
    ? import.meta.env.VITE_APP_USER_OTP
    : import.meta.env.VITE_APP_USER_OTP

const RESET_PASSWORD = ENV_VALIDATOR
    ? import.meta.env.VITE_APP_RESET_SECURITY_CODE
    : import.meta.env.VITE_APP_RESET_SECURITY_CODE


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