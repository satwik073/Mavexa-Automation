export interface FooterStylingAttached {
    grid_systems: string;
    grid_systems_from_col_end: string;
    resposnive_properties_padding: string;
    grid_containers: string;
    footer_headlines_bolded: string;
    data_headlines: string;
    links_attached_beautified: string;
    divider_remastered: string;
    box_stylings_defined: string;
    inner_box: string;
    copyright_text: string;
    social_media_links_fetched: string;
}

export const FOOTER_SYLING_ATTACHED: FooterStylingAttached = {
    grid_systems: "mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16 w-full",
    grid_systems_from_col_end: "col-span-2 lg:col-span-3 lg:flex lg:items-end w-full",
    resposnive_properties_padding: "mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 w-full",
    grid_containers: "lg:flex lg:items-start lg:gap-8 w-full",
    footer_headlines_bolded: "mt-10 relative text-sm sm:text-xl text-zinc-500 dark:text-zinc-300 tracking-wide mb-8 text-left max-w-2xl antialiased leading-loose",
    data_headlines: "font-bold text-gray-900 dark:text-white text-xl -mb-3",
    links_attached_beautified: "relative text-sm sm:text-ll text-zinc-500 dark:text-zinc-300 tracking-wide text-left max-w-2xl antialiased leading-loose",
    divider_remastered: "dark:bg-gray-800",
    box_stylings_defined: "flex justify-center items-center gap-6 py-8 px-4 bg-gray-200 dark:bg-black w-full",
    inner_box: "flex flex-col w-[72%]",
    copyright_text: "text-neutral-900 dark:text-gray-200 text-xs flex items-center md:text-sm",
    social_media_links_fetched: "text-neutral-900 transition hover:opacity-75 dark:text-gray-200 flex items-center"
};
