
// import { Home } from "lucide-react"
// import { CiMoneyCheck1 } from "react-icons/ci";
// import { FaConnectdevelop } from "react-icons/fa"
// import { IoSettingsOutline } from "react-icons/io5";
// import { PiSoundcloudLogoLight, PiStackOverflowLogoThin } from "react-icons/pi";
// import { FC } from 'react';
// import { z } from 'zod'
// import { GrTemplate } from "react-icons/gr";
// // import { defualt_and_defined_routes } from "../Constants/standard_routes"
// interface NavitemDestructured {
//   id: number,
//   route_link_naming_determined: string,
//   specified_path: string
// }
// interface MenuOptionProps {
//   naming_determined : string,
//   Component : FC<any>,
//   href_routes_enabled : string
// }
// export const menuOptions : MenuOptionProps[] =  [
//   { naming_determined: 'Dashboard', Component: Home, href_routes_enabled: `${defualt_and_defined_routes.dashboard_routes}` },
//   { naming_determined: 'Workflows', Component: PiStackOverflowLogoThin, href_routes_enabled: `${defualt_and_defined_routes.workflows_route}` },
//   { naming_determined: 'Settings', Component: IoSettingsOutline, href_routes_enabled: `${defualt_and_defined_routes.settings_route}` },
//   { naming_determined: 'Connections', Component: FaConnectdevelop, href_routes_enabled: `${defualt_and_defined_routes.connections_route}` },
//   { naming_determined: 'Billings', Component: CiMoneyCheck1, href_routes_enabled: `${defualt_and_defined_routes.billing_route}` },
//   { naming_determined: 'Templates', Component: GrTemplate, href_routes_enabled: `${defualt_and_defined_routes.templates_route}` },
//   { naming_determined: 'Logs', Component: PiSoundcloudLogoLight, href_routes_enabled: `${defualt_and_defined_routes.previous_logs}` },
// ]
// export const WorkflowFormSchema = z.object({
//   name: z.string().min(1, 'Required'),
//   description: z.string().min(1, 'Required'),
// })

// export const Navhandler: NavitemDestructured[] = [
//   {
//     "id": 1,
//     route_link_naming_determined: defualt_and_defined_routes.products_route.substring(1),
//     specified_path: defualt_and_defined_routes.products_route
//   },
//   {
//     "id": 2,
//     route_link_naming_determined: defualt_and_defined_routes.pricing_route.substring(1),
//     specified_path: defualt_and_defined_routes.pricing_route
//   },
//   {
//     "id": 3,
//     route_link_naming_determined: defualt_and_defined_routes.clients_route.substring(1),
//     specified_path: defualt_and_defined_routes.clients_route
//   },
//   {
//     "id": 4,
//     route_link_naming_determined: defualt_and_defined_routes.resources_route.substring(1),
//     specified_path: defualt_and_defined_routes.resources_route
//   },
//   {
//     "id": 5,
//     route_link_naming_determined: defualt_and_defined_routes.documentation_route.substring(1),
//     specified_path: defualt_and_defined_routes.documentation_route
//   },
//   {
//     "id": 6,
//     route_link_naming_determined: defualt_and_defined_routes.enterprise_route.substring(1),
//     specified_path: defualt_and_defined_routes.enterprise_route
//   },
// ]

// export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'


// export const CONNECTIONS = [
//   {
//     title: 'Google Drive',
//     description: 'Connect your google drive to listen to folder changes',
//     image: '/googleDrive.png',
//     connectionKey: 'googleNode',
//     alwaysTrue: true,
//   },
//   {
//     title: 'Discord',
//     description: 'Connect your discord to send notification and messages',
//     image: '/discord.png',
//     connectionKey: 'discordNode',
//     accessTokenKey: 'webhookURL',
//   },
//   {
//     title: 'Notion',
//     description: 'Create entries in your notion dashboard and automate tasks.',
//     image: '/notion.png',
//     connectionKey: 'notionNode',
//     accessTokenKey: 'accessToken',
//   },
//   {
//     title: 'Slack',
//     description:
//       'Use slack to send notifications to team members through your own custom bot.',
//     image: '/slack.png',
//     connectionKey: 'slackNode',
//     accessTokenKey: 'slackAccessToken',
//     slackSpecial: true,
//   },
// ]