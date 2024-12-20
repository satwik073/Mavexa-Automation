export enum RoutesConfiguration {
    DEFAULT_PATH = '/',
    AUTH = '/automation',
    VERIFICATION = '/tenant/verification',
    PRODUCTS = '/products',
    PRICING = '/pricing',
    CLIENTS = '/clients',
    RESOURCES = '/resources',
    LOGIN = '/login',
    REGISTRATION = '/register',
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
    NU_R = 'number',
    BL_N = 'boolean',
    EM_L = 'email',
    DATE = 'date',
    TIME = 'time',
    TEL = 'tel',
    URL = 'url',
    TEXT = 'text',
    SELECT = 'select',
    OBJ = 'object',
    PS_D = 'password',
    PHN = 'phone'
}

export enum TextTypeIdentifier {
    H1 = 'H1',
    H2 = 'H2',
    H3 = 'H3',
    H6 = 'H6',
    Title = 'Title',
    Subtitle = 'Subtitle',
    Body = 'Body',
    Body2 = 'Body2',
    BodyLarge = 'BodyLarge',
    Caption = 'Caption',
    CaptionBold = 'CaptionBold',
    Micro = 'Micro',
    TitleText = 'TitleText',
    Default = '',
}

export enum BoxTypeIdentifier {
    Div = 'div',
    Nav = 'nav',
    Section = 'section',
    Header = 'header',
    Footer = 'footer',
    Article = 'article',
    Aside = 'aside',
    Main = 'main',
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    H6 = 'h6',
    P = 'p',
    Span = 'span',
    A = 'a',
    Img = 'img',
    Table = 'table',
    Thead = 'thead',
    Tbody = 'tbody',
    Tr = 'tr',
    Td = 'td',
    Th = 'th',
    Ul = 'ul',
    Ol = 'ol',
    Li = 'li',
    Form = 'form',
    Input = 'input',
    Button = 'button',
    Label = 'label',
    Select = 'select',
    Textarea = 'textarea',
    Video = 'video',
    Audio = 'audio',
    Details = 'details',
    Summary = 'summary',
    Dialog = 'dialog',
    Output = 'output',
    Default = 'div', // Fallback to div
}
