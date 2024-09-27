export enum RoutesConfiguration {
    DEFAULT_PATH = '/',
    AUTH = '/automation',
    VERIFICATION = '/tenant/verification',
    PRODUCTS = '/products',
    PRICING = '/pricing',
    CLIENTS = '/clients',
    RESOURCES = '/resources',
    DOCUMENTATION = '/documentation',
    ENTERPRISE = '/enterprise',
    DASHBOARD = '/dashboard',
    WORKFLOWS = '/workflows',
    SETTINGS = '/settings',
    CONNECTIONS = '/connections',
    BILLINGS = '/billings',
    TEMPLATES = '/templates',
    LOGS = '/logs',
}
export enum AuthFlowIdentifier {
    SIGN_IN = 'Login',
    REGISTER_VAR = 'Register'
}

export enum RolesIdentifier {
    ADMIN = 'admin',
    USER = 'user',
    ENTERPRISE_ADMIN = 'Enterprise Admin',
    SUB_USER_ACCOUNT = 'Subuser',
    SUB_ADMIN = 'Subadmin'
}

export enum DataTypeFormIdentifier {
    ST_G = 'string',
    NU_R= 'number',
    BL_N= 'boolean',
    EM_L = 'email',
    DATE = 'date',
    TIME = 'time',
    TEL = 'tel',
    URL = 'url',
    TEXT = 'text',
    SELECT = 'select',
    OBJ = 'object',
    PS_D ='password',
    PHN ='phone'
}
