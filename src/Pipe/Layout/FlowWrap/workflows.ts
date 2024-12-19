export const ENV_MODE = import.meta.env.MODE;

const version: string = 'v1';

const SERVER_BASE = {
    production: import.meta.env.VITE_APP_HOSTED_SERVER,
    staging: import.meta.env.VITE_APP_LOCAL_SERVER_BASE_URL,
    development: import.meta.env.VITE_APP_HOSTED_SERVER_DEV
}[ENV_MODE] || import.meta.env.VITE_APP_HOSTED_SERVER_DEV;

export const CREATION_FLOWS = {
    production: import.meta.env.VITE_APP_USER_LOGIN,
    staging: import.meta.env.VITE_APP_USER_LOGIN,
    development: import.meta.env.VITE_APP_USER_LOGIN
}[ENV_MODE] || import.meta.env.VITE_APP_USER_LOGIN;


