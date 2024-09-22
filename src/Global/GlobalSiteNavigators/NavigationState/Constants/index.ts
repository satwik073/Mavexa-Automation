import { NavigationProperties, ThemeProviderOptions } from "./structure";
import { AiFillThunderbolt } from "react-icons/ai";
import { RoutesConfiguration } from "@/Constants/structure";
import SaaSyAutomationLogo from "../SaasySeparator/SaasyAutomationLogo";
import ImageContainer from "@/Components/Images/ImageContainer";

export const PRODUCTS_CONFIGURATIONS: NavigationProperties = {
    LOGO_SETTINGS: {
        initials: "Saa",
        trailing_constants: "y",
        theme_controlled_icon: AiFillThunderbolt,
        product_display : SaaSyAutomationLogo,
        im_props : ImageContainer
    },
    LINKS_SETTINGS: {
        properties: [
            { route_link_staged: RoutesConfiguration.PRODUCTS.substring(1), path_controlled: RoutesConfiguration.PRODUCTS },
            { route_link_staged: RoutesConfiguration.PRICING.substring(1), path_controlled: RoutesConfiguration.PRICING },
            { route_link_staged: RoutesConfiguration.CLIENTS.substring(1), path_controlled: RoutesConfiguration.CLIENTS },
            { route_link_staged: RoutesConfiguration.RESOURCES.substring(1), path_controlled: RoutesConfiguration.RESOURCES },
            { route_link_staged: RoutesConfiguration.DOCUMENTATION.substring(1), path_controlled: RoutesConfiguration.DOCUMENTATION },
            { route_link_staged: RoutesConfiguration.ENTERPRISE.substring(1), path_controlled: RoutesConfiguration.ENTERPRISE },
        ],
        theme_options: [ThemeProviderOptions.DARK_TH, ThemeProviderOptions.LIGHT_TH, ThemeProviderOptions.DEFAULT],
        theme_processor: ThemeProviderOptions
    }
}