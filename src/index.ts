
import  InputOTPForm  from './Auth/PasscodeAuth/VerificationAuthService';
import UserLoginEnabled from './Auth/AuthTokenHandler/AuthServiceValidator';
import ModeratorLazyLoader from "./Moderator";
import Product from "./Network/Product";
import UserRegistrationEnabled from './Auth/ProvisioningPipeline/AccountInitialization'
import Pricing from './Network/Pricing';
import Documentation from './Network/Documentation';
import Clients from './Network/Clients';
import Enterprise from './Network/Enterprise';
import Resources from './Network/Resources';
import Dashboard from './Network/Dashboard';
import SEO_Module_Optimizer from './providers/SEO_Optimizer';


interface RenderingAnnotations {

    MOD_T : typeof ModeratorLazyLoader;
    OTP_TQ : typeof InputOTPForm,
    LG_AUTH : typeof UserLoginEnabled,
    PR_S : typeof Product,
    PR_C : typeof Pricing,
    DOC_TN : typeof Documentation,
    CL_N : typeof Clients,
    EN_TP : typeof Enterprise,
    RC_S : typeof Resources,
    RG_S : typeof UserRegistrationEnabled,
    DSH : typeof Dashboard,
    SEO_OPT : typeof SEO_Module_Optimizer

}
export const APP_CONFIG : RenderingAnnotations ={

    MOD_T : ModeratorLazyLoader,
    OTP_TQ : InputOTPForm,
    LG_AUTH : UserLoginEnabled,
    PR_S : Product,
    PR_C :  Pricing,
    DOC_TN :  Documentation,
    CL_N :  Clients,
    EN_TP :  Enterprise,
    RC_S :  Resources,
    RG_S : UserRegistrationEnabled,
    DSH : Dashboard,
    SEO_OPT : SEO_Module_Optimizer
}

