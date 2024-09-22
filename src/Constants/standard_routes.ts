
import { RoutesConfiguration } from "./structure";


export const ROUTES_EXT = {
    DEFAULT: {
        PATH: RoutesConfiguration.DEFAULT_PATH,
    },
    AUTH_FLOW :{
        ATM: RoutesConfiguration.AUTH,
    },
    FEAT_CONFIG: {
        PRD: RoutesConfiguration.PRODUCTS,
        PRC: RoutesConfiguration.PRICING,
        CLN: RoutesConfiguration.CLIENTS,
        RSS: RoutesConfiguration.RESOURCES,
        DOC: RoutesConfiguration.DOCUMENTATION,
        ENP: RoutesConfiguration.ENTERPRISE,
    },
    END_FLOW: {
        DAS: RoutesConfiguration.DASHBOARD,
        WRK: RoutesConfiguration.WORKFLOWS,
        SET: RoutesConfiguration.SETTINGS,
        CNR: RoutesConfiguration.CONNECTIONS,
        BLG: RoutesConfiguration.BILLINGS,
        TMP: RoutesConfiguration.TEMPLATES,
        PLG: RoutesConfiguration.LOGS,
    },
};
