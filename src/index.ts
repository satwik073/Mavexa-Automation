
// import PrimarySiteNavigator from "./Global/GlobalSiteNavigators/NavigationState/PrimarySiteNavigator";
// import { SpotlightPreview } from "@/Pages/SpotLightCombined/SpotLightModuler";
// import { InfiniteMovingCards } from "@/Animations/MovingCardsGlobalState";
// import { FeaturesSectionDemo } from "@/Pages/GridContainer/GridConstants";
// import { FeaturedSectionDemo } from "@/Pages/GridContainer/GridTerminalLayout";
// import CardContainers from "@/Pages/CardWrapper/CardFlexContainers";
// import PeopleEngaged from "@/Pages/Testimonials/PeopleEngaged";
// import PrimarySiteFooter from "./Globals/GlobalSiteFooter/FooterAttributesWrapping/Components/PrimarySiteFooter";
import { InputOTPForm } from './Auth/PasscodeAuth/VerificationAuthService';
import UserLoginEnabled from './Auth/AuthTokenHandler/AuthServiceValidator';
import ModeratorLazyLoader from "./Moderator";
import Product from "./Network/Product";
import UserRegistrationEnabled from './Auth/ProvisioningPipeline/AccountInitialization'


interface RenderingAnnotations {
    // NB_JN: typeof PrimarySiteNavigator;
    // SPT_PR: typeof SpotlightPreview;
    // IN_SC: typeof InfiniteMovingCards;
    MOD_T : typeof ModeratorLazyLoader;
    OTP_TQ : typeof InputOTPForm
    LG_AUTH : typeof UserLoginEnabled,
    PR_S : typeof Product
    RG_S : typeof UserRegistrationEnabled,
    // FS_DM: typeof FeaturesSectionDemo;
    // FD_DM : typeof FeaturedSectionDemo;
    // CDC_T: typeof CardContainers;
    // PE: typeof PeopleEngaged;
    // FTR: typeof PrimarySiteFooter;
}
export const APP_CONFIG : RenderingAnnotations ={
    // NB_JN: PrimarySiteNavigator,
    // SPT_PR: SpotlightPreview,
    // IN_SC: InfiniteMovingCards,
    MOD_T : ModeratorLazyLoader,
    OTP_TQ : InputOTPForm,
    LG_AUTH : UserLoginEnabled,
    PR_S : Product,
    RG_S : UserRegistrationEnabled

    // FS_DM: FeaturesSectionDemo,
    // FD_DM: FeaturedSectionDemo,
    // CDC_T: CardContainers,
    // PE: PeopleEngaged,
    // FTR : PrimarySiteFooter
}

