import { FlipWordsDemo } from "../Animations/FlickeringWordsAttached";
import { Spotlight } from "../Components/ui/SpotLightReducer";


interface SpotlightContent {
    headline_fetched : string
    flip_words_component_attached : typeof FlipWordsDemo,
    splot_light_effects_emerald : typeof Spotlight
}
export const SPOT_LIGHT_PREVIEW_CONTENT_RAISED : SpotlightContent = {
    headline_fetched : "Copy paste the most trending components and use them in your websites without having to worry about styling and animations.",
    flip_words_component_attached : FlipWordsDemo,
    splot_light_effects_emerald : Spotlight
    
}