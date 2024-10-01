import { ComponentType } from 'react';
import { FaDribbble, FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

interface LinkData {
    path_specified: string;
    text_fields: string;
}

interface SocialMediaLink {
    target_window: string;
    rel: string;
    path_specified: string;
    icons_from_react: ComponentType;
    label: string;
}

interface FooterHeadings {
    fetched_headings_attached: string;
    links_estaiblished: LinkData[];
}

export interface TranslatingFooterText {
    footer_headlines: string;
    footer_copyright_issue_marked: string;
    footer_fetched_headings_attached_links: FooterHeadings[];
    social_media_connections: SocialMediaLink[];
}

export const TRANSLATING_FOOTER_TEXT: TranslatingFooterText = {
    footer_headlines: "Revolutionize your business with seamless automation and cutting-edge technology, empowering you to focus on growth and innovation while we handle the complexities of your digital operations",
    footer_copyright_issue_marked: "2024 Mavexa All rights reserved.",
    footer_fetched_headings_attached_links: [
        {
            fetched_headings_attached: "Services",
            links_estaiblished: [
                { path_specified: "#", text_fields: "1on1 Coaching" },
                { path_specified: "#", text_fields: "Company Review" },
                { path_specified: "#", text_fields: "Accounts Review" },
                { path_specified: "#", text_fields: "HR Consulting" },
                { path_specified: "#", text_fields: "SEO Optimisation" }
            ]
        },
        {
            fetched_headings_attached: "Company",
            links_estaiblished: [
                { path_specified: "#", text_fields: "About" },
                { path_specified: "#", text_fields: "Meet the Team" },
                { path_specified: "#", text_fields: "Accounts Review" }
            ]
        },
        {
            fetched_headings_attached: "Helpful",
            links_estaiblished: [
                { path_specified: "#", text_fields: "Contact" },
                { path_specified: "#", text_fields: "FAQs" },
                { path_specified: "#", text_fields: "Live Chat" }
            ]
        },
        {
            fetched_headings_attached: "Legal",
            links_estaiblished: [
                { path_specified: "#", text_fields: "Accessibility" },
                { path_specified: "#", text_fields: "Returns Policy" },
                { path_specified: "#", text_fields: "Refund Policy" },
                { path_specified: "#", text_fields: "Hiring Statistics" }
            ]
        },
        
    ],
    social_media_connections: [
        { target_window: "_blank", rel: "noreferrer", path_specified: '#', icons_from_react: FaFacebook, label: 'Facebook' },
        { target_window: "_blank", rel: "noreferrer", path_specified: '#', icons_from_react: FaInstagram, label: 'Instagram' },
        { target_window: "_blank", rel: "noreferrer", path_specified: '#', icons_from_react: FaTwitter, label: 'Twitter' },
        { target_window: "_blank", rel: "noreferrer", path_specified: '#', icons_from_react: FaGithub, label: 'GitHub' },
        { target_window: "_blank", rel: "noreferrer", path_specified: '#', icons_from_react: FaDribbble, label: 'Dribbble' }
    ]
};
