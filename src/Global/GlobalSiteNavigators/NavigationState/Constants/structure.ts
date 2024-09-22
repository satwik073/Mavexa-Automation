import { AiFillThunderbolt } from "react-icons/ai"
import SaaSyAutomationLogo from "../SaasySeparator/SaasyAutomationLogo"
import ImageContainer from "@/Components/Images/ImageContainer"

export interface NavbarItemsDestructuringController {
    route_link_staged: string,
    path_controlled: string,
}

export enum ThemeProviderOptions {
    DARK_TH = 'dark',
    LIGHT_TH = 'light',
    DEFAULT = 'system',
}
export enum ThemeSchema {
    BLK_CL = '#000',
    WHT_CL = '#FFF',
    SPT_LH = '#10B981'
}
export interface NavigationProperties {
    LOGO_SETTINGS: {
        initials: string,
        trailing_constants: string,
        im_props : typeof ImageContainer,
        product_display : typeof SaaSyAutomationLogo
        // theme_complexions : typeof
        theme_controlled_icon: typeof AiFillThunderbolt
    },
    LINKS_SETTINGS: {
        properties: NavbarItemsDestructuringController[],
        theme_options: ThemeProviderOptions[],
        theme_processor: typeof ThemeProviderOptions
    }
}

interface SpotLightStylingAttriibutes {
    browse_component_flexed : string
    custom_component_flexed : string
    splot_light_main :string
    variant_heading_typography : string 
    variants_para_typography : string
    buttons_parent_grid_issues : string
    grid_items_combined:string
}
export const SPOTLIGHT_CUSTOM_STYLINGS_ATTACHED : SpotLightStylingAttriibutes = {
    browse_component_flexed : "bg-slate-900 dark:bg-white dark:text-black no-underline flex space-x-2 group cursor-pointer relative hover:shadow-2xl transition duration-200 shadow-zinc-900 p-px font-semibold text-white px-4 py-2 w-full sm:w-52 h-14 rounded-2xl text-sm text-center items-center justify-center",
    custom_component_flexed : "w-full sm:w-52 text-sm text-black bg-white dark:bg-black h-14 border border-neutral-300  dark:text-white dark:border-emerald-500 flex  justify-center hover:bg-slate-900 hover:border-emerald-500 hover:text-white items-center rounded-2xl  transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
    splot_light_main : "md:h-[50rem] md:mt-0 mt-9 w-full rounded-md flex md:items-center bg-white dark:bg-black/[0.96] antialiased bg-grid-black/[0.06] dark:bg-grid-white/[0.08] relative overflow-hidden",
    variant_heading_typography : "text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50",
    variants_para_typography : " relative text-sm sm:text-xl text-zinc-500 dark:text-zinc-300 tracking-wide mb-8 text-left max-w-2xl antialiased leading-loose",
    buttons_parent_grid_issues :"flex relative sm:flex-row flex-col space-y-2 justify-center sm:space-y-0 sm:space-x-4 sm:justify-start mb-4 w-full",
    grid_items_combined:" p-4 max-w-7xl   md:mx-12 relative z-10  w-full pt-20 md:pt-0"
}