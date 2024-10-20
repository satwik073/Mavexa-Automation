import { REUSABLE_CONFIG } from "@/Constants/globalStyles";

interface ProductDisplaySchema {
    headedTextLogo: string;
    headedText: string;
    tailedText: string;
    buttonEffect: string;
    spanOutline: string;
    inlineSource: string;
    leftAside: string;
    absoluteStructure: string;
    listItems: string;
  }
  
  export const PR_STY: { STLP: ProductDisplaySchema } = {
    STLP: {
      headedTextLogo: `${REUSABLE_CONFIG.flexItemsCenter} gap-[12px]`,
      headedText: `md:text-[1.6rem] tracking-tighter	 text-2xl ${REUSABLE_CONFIG.commonFontBold}`,
      tailedText: `md:text-2xl text-2xl ${REUSABLE_CONFIG.commonFontBold}`,
      buttonEffect: `
        relative inline-flex h-10 overflow-hidden ${REUSABLE_CONFIG.fullRounded} p-[2px] 
        ${REUSABLE_CONFIG.commonRingEffect}
      `,
      spanOutline: `
        absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
        ${REUSABLE_CONFIG.commonGradient} transition-opacity duration-500 
        group-hover:opacity-40
      `,
      inlineSource: `
        inline-flex h-full w-full cursor-pointer ${REUSABLE_CONFIG.fullRounded} 
        bg-white dark:bg-slate-950 px-3 py-1 ${REUSABLE_CONFIG.commonTextSm} 
        font-medium text-black ${REUSABLE_CONFIG.darkModeText} 
        backdrop-blur-3xl
      `,
      leftAside: `
        md:px-12  right-0 left-0  py-4 px-4 bg-white dark:bg-black/40 
        dark:backdrop-blur-md z-[1000] ${REUSABLE_CONFIG.flexItemsCenter} 
        border-b-[1px] border-neutral-100 dark:border-neutral-900 justify-between
      `,
      absoluteStructure: `${REUSABLE_CONFIG.absoluteCenter} hidden md:block`,
      listItems: `${REUSABLE_CONFIG.flexItemsCenter} list-none`,
    },
  };
  