export const REUSABLE_CONFIG = {
    flexCenterCommon: "flex items-center justify-center",
    darkModeText: "dark:text-white",
    transitionCommon: "transition duration-200",
    roundedxlCommon: "rounded-xl",
    commonTextSm: "text-sm",
    commonPadding: "px-4 py-2",
    commonShadow: "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
    commonFontBold: "font-bold",
    absoluteCenter: "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
    commonRingEffect: "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
    fullRounded: "rounded-full",
    flexItemsCenter: "flex items-center",
    commonGradient: "bg-gradient-to-r from-black via-emerald-500/90 to-slate-950",
}
import { ThemeProviderOptions } from '@/Global/GlobalSiteNavigators/NavigationState/Constants/structure';
import { PaletteMode } from '@mui/material';

const rgbGen = (r: number, g: number, b: number): string =>
    `rgba(${r},${g},${b})`;

const rgbaGen = (r: number, g: number, b: number, alpha: number = 1): string =>
    `rgba(${r},${g},${b},${alpha})`;
const complexGradientGen = (...colors: string[]): string => {
    const directions = ['to right', 'to left', 'to bottom', 'to top'];
    const randomDir = directions[Math.floor(Math.random() * directions.length)];
    return `linear-gradient(${randomDir}, ${colors.join(', ')})`;
};

const shadowMaker = (r: number, g: number, b: number) => {
    return [
        `0px 1px 3px 0px ${rgbaGen(r, g, b, 0.2)}`,
        `0px 4px 6px 0px ${rgbaGen(r, g, b, 0.1)}`,
        `0px 10px 15px -3px ${rgbaGen(r, g, b, 0.3)}`
    ].join(', ');
};

export const colorMixGenerator = (mode: PaletteMode): any => ({
    primary: mode === ThemeProviderOptions.DARK_TH ? rgbaGen(144, 202, 249) : rgbaGen(25, 118, 210),
    secondary: mode === ThemeProviderOptions.DARK_TH ? rgbaGen(244, 143, 177) : rgbaGen(211, 47, 47),
    error: mode === ThemeProviderOptions.DARK_TH ? rgbaGen(239, 83, 80) : rgbaGen(211, 47, 47),
    success: mode === ThemeProviderOptions.DARK_TH ? rgbaGen(102, 187, 106) : rgbaGen(56, 142, 60),
    info: mode === ThemeProviderOptions.DARK_TH ? rgbaGen(41, 182, 246) : rgbaGen(2, 136, 209),
    warning: mode === ThemeProviderOptions.DARK_TH ? rgbaGen(255, 183, 77) : rgbaGen(255, 160, 0),
    background: mode === ThemeProviderOptions.DARK_TH ? '#121212' : '#ffffff',
    surface: mode === ThemeProviderOptions.DARK_TH ? '#424242' : '#f5f5f5',
});

const gradientColorMix = {
    redToBlue: complexGradientGen(rgbaGen(255, 0, 0), rgbaGen(0, 0, 255)),
    purpleToPink: complexGradientGen(rgbaGen(156, 39, 176), rgbaGen(244, 143, 177)),
    blackToWhiteOverlay: complexGradientGen(rgbaGen(0, 0, 0, 0.7), rgbaGen(255, 255, 255, 0.2)),
};
const gradientDirection = () => {
    const directions = ['to top', 'to bottom', 'to left', 'to right', 'to top right', 'to bottom left'];
    return directions[Math.floor(Math.random() * directions.length)];
};


const gradientGen = (color1: string, color2: string, alpha1: number = 1, alpha2: number = 1) => {
    const color1Values = color1.split(',').map(value => parseFloat(value.trim())) as [number, number, number];
    const color2Values = color2.split(',').map(value => parseFloat(value.trim())) as [number, number, number];
  
    return `linear-gradient(${gradientDirection()}, ${rgbaGen(...color1Values, alpha1)}, ${rgbaGen(...color2Values, alpha2)})`;
  };
interface ColorStructure {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
    gradient?: string;
}

interface InteractiveColors {
    hover: string;
    active: string;
    focus: string;
    disabled: string;
}

interface ExtendedColorScheme {
    primary: ColorStructure & InteractiveColors;
    secondary: ColorStructure & InteractiveColors;
    error: ColorStructure & InteractiveColors;
    warning: ColorStructure & InteractiveColors;
    info: ColorStructure & InteractiveColors;
    success: ColorStructure & InteractiveColors;
    background: {
        default: string;
        paper: string;
        overlay: string;
    };
    text: {
        primary: string;
        secondary: string;
        disabled: string;
        link: string;
        contrast: string;
    };
    border: {
        default: string;
        active: string;
        disabled: string;
    };
    shadow: string;
}


const interactiveStates = (baseColor: string) => {
    const rgbaValues = baseColor.split(',').map(value => parseFloat(value.trim())) as [number, number, number, number?];

    if (rgbaValues.length < 3) {
        throw new Error("baseColor must contain at least three values for RGB.");
    }

    const hoverAlpha = 0.85;
    const activeAlpha = 1;
    const focusAlpha = 0.9;
    const disabledAlpha = 0.5;

    return {
        hover: rgbaGen(rgbaValues[0], rgbaValues[1], rgbaValues[2], hoverAlpha),
        active: rgbaGen(rgbaValues[0], rgbaValues[1], rgbaValues[2], activeAlpha),
        focus: rgbaGen(rgbaValues[0], rgbaValues[1], rgbaValues[2], focusAlpha),
        disabled: rgbaGen(rgbaValues[0], rgbaValues[1], rgbaValues[2], disabledAlpha),
    };
};

const generateComplexColorStructure = (baseColor: string, contrastColor: string, steps: number): ColorStructure => {
    const [light, dark] = createShade(baseColor, steps);
    return {
        main: baseColor,
        light,
        dark,
        contrastText: contrastColor,
        gradient: gradientGen(baseColor, contrastColor)
    };
};
const getSystemColors = (mode: PaletteMode): ExtendedColorScheme => {
    const isDark = mode === ThemeProviderOptions.DARK_TH;

    const primary = isDark ? '13, 71, 161' : '25, 118, 210';
    const secondary = isDark ? '194, 24, 91' : '233, 30, 99';
    const error = isDark ? '211, 47, 47' : '244, 67, 54';
    const success = isDark ? '56, 142, 60' : '76, 175, 80';
    const warning = isDark ? '255, 143, 0' : '255, 152, 0';
    const info = isDark ? '2, 136, 209' : '3, 169, 244';

    const contrastText = isDark ? '#ffffff' : '#000000';
    const steps = 10;

    const primaryColor = generateComplexColorStructure(primary, contrastText, steps);
    const secondaryColor = generateComplexColorStructure(secondary, contrastText, steps);
    const errorColor = generateComplexColorStructure(error, contrastText, steps);
    const successColor = generateComplexColorStructure(success, contrastText, steps);
    const warningColor = generateComplexColorStructure(warning, contrastText, steps);
    const infoColor = generateComplexColorStructure(info, contrastText, steps);

    return {
        primary: {
            ...primaryColor,
            ...interactiveStates(primary),
        },
        secondary: {
            ...secondaryColor,
            ...interactiveStates(secondary),
        },
        error: {
            ...errorColor,
            ...interactiveStates(error),
        },
        warning: {
            ...warningColor,
            ...interactiveStates(warning),
        },
        info: {
            ...infoColor,
            ...interactiveStates(info),
        },
        success: {
            ...successColor,
            ...interactiveStates(success),
        },
        background: {
            default: isDark ? '#121212' : '#fafafa',
            paper: isDark ? '#1e1e1e' : '#ffffff',
            overlay: gradientGen(primary, secondary),
        },
        text: {
            primary: isDark ? '#ffffff' : '#000000',
            secondary: isDark ? '#bbbbbb' : '#555555',
            disabled: isDark ? '#888888' : '#cccccc',
            link: isDark ? '#82b1ff' : '#1976d2',
            contrast: contrastText,
        },
        border: {
            default: isDark ? '#444444' : '#dddddd',
            active: isDark ? '#888888' : '#aaaaaa',
            disabled: isDark ? '#333333' : '#eeeeee',
        },
        shadow: isDark
            ? `0px 4px 20px ${rgbaGen(0, 0, 0, 0.7)}`
            : `0px 4px 20px ${rgbaGen(0, 0, 0, 0.3)}`,
    };
};

const createShade = (baseColor: string, steps: number): string[] => {
    const lightenOrDarken = (color: string, step: number) => {
        const parsed = color.match(/\d+/g)?.map(Number) || [];
        return `rgba(${parsed[0] + step}, ${parsed[1] + step}, ${parsed[2] + step}, ${parsed[3] || 1})`;
    };
    return Array.from({ length: steps }, (_, i) => lightenOrDarken(baseColor, i * 10));
};
const colorVariant = (baseColor: string, mode: PaletteMode) => {
    return {
        light: mode === ThemeProviderOptions.DARK_TH ? `${baseColor}33` : `${baseColor}66`,
        main: `${baseColor}`,
        dark: mode === ThemeProviderOptions.DARK_TH ? `${baseColor}ff` : `${baseColor}99`,
        contrastText: mode === ThemeProviderOptions.DARK_TH ? '#fff' : '#000',
    };
};

const generateShadowByMode = (mode: PaletteMode, baseColor: string) =>
    mode === ThemeProviderOptions.DARK_TH ? shadowMaker(33, 33, 33) : shadowMaker(0, 0, 0);

const typographyColors = (mode: PaletteMode) => ({
    primary: colorMixGenerator(mode).primary,
    secondary: colorMixGenerator(mode).secondary,
    disabled: rgbaGen(158, 158, 158, 0.5),
    linkText: mode === ThemeProviderOptions.DARK_TH ? rgbaGen(130, 177, 255) : rgbaGen(25, 118, 210),
});

const borderSurfaceGen = (mode: PaletteMode) => ({
    borderColor: mode === ThemeProviderOptions.DARK_TH ? rgbaGen(66, 66, 66) : rgbaGen(224, 224, 224),
    surfaceColor: mode === ThemeProviderOptions.DARK_TH ? '#303030' : '#fafafa',
});


export const generateColorSystem = (mode: PaletteMode) => {
    const primaryColor = colorMixGenerator(mode).primary;
    const secondaryColor = colorMixGenerator(mode).secondary;

    return {
        palette: {
            mode,
            primary: colorVariant(primaryColor, mode),
            secondary: colorVariant(secondaryColor, mode),
            error: colorVariant(colorMixGenerator(mode).error, mode),
            warning: colorVariant(colorMixGenerator(mode).warning, mode),
            info: colorVariant(colorMixGenerator(mode).info, mode),
            success: colorVariant(colorMixGenerator(mode).success, mode),
            background: {
                default: colorMixGenerator(mode).background,
                paper: colorMixGenerator(mode).surface,
            },
        },
        typography: {
            color: typographyColors(mode),
        },
        shadows: generateShadowByMode(mode, primaryColor),
        gradients: gradientColorMix,
        surfaces: borderSurfaceGen(mode),
    };
};


