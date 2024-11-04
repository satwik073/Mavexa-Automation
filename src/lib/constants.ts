import { ConnectionProviderProps } from "@/providers/ConnectionsProvider";
import { z } from "zod";

export const clients = Array.from({ length: 10 }, (_, index) => ({
    href: `/${index + 1}.png`
}));
export const clients_inverted = Array.from({length : 10}, (_ , index) =>({
  href: `/image${index}.png`
}))

export const WorkflowFormSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
})



export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'

export type Connection = {
  title: ConnectionTypes
  description: string
  image: string
  connectionKey: keyof ConnectionProviderProps
  accessTokenKey?: string
  alwaysTrue?: boolean
  slackSpecial?: boolean
}

export type EditorCanvasTypes =
  | 'Email'
  | 'Condition'
  | 'AI'
  | 'Slack'
  | 'Google Drive'
  | 'Notion'
  | 'Custom Webhook'
  | 'Google Calendar'
  | 'Trigger'
  | 'Action'
  | 'Wait'

export type EditorCanvasCardType = {
  title: string
  description: string
  completed: boolean
  current: boolean
  metadata: any
  type: EditorCanvasTypes
}

export type EditorNodeType = {
  id: string
  type: EditorCanvasCardType['type']
  position: {
    x: number
    y: number
  }
  data: EditorCanvasCardType
}

export type EditorNode = EditorNodeType

export type EditorActions =
  | {
      type: 'LOAD_DATA'
      payload: {
        elements: EditorNode[]
        edges: {
          id: string
          source: string
          target: string
        }[]
      }
    }
  | {
      type: 'UPDATE_NODE'
      payload: {
        elements: EditorNode[]
      }
    }
  | { type: 'REDO' }
  | { type: 'UNDO' }
  | {
      type: 'SELECTED_ELEMENT'
      payload: {
        element: EditorNode
      }
    }

export const nodeMapper: Record<string, string> = {
  Notion: 'notionNode',
  Slack: 'slackNode',
  Discord: 'discordNode',
  'Google Drive': 'googleNode',
}

export const products = [
    {
      title: 'Moonbeam',
      link: 'https://gomoonbeam.com',
      thumbnail: '/p1.png',
    },
    {
      title: 'Cursor',
      link: 'https://cursor.so',
      thumbnail: '/p2.png',
    },
    {
      title: 'Rogue',
      link: 'https://userogue.com',
      thumbnail: '/p3.png',
    },
  
    {
      title: 'Editorially',
      link: 'https://editorially.org',
      thumbnail: '/p4.png',
    },
    {
      title: 'Editrix AI',
      link: 'https://editrix.ai',
      thumbnail: '/p5.png',
    },
    {
      title: 'Pixel Perfect',
      link: 'https://app.pixelperfect.quest',
      thumbnail: '/p6.png',
    },
  
    {
      title: 'Algochurn',
      link: 'https://algochurn.com',
      thumbnail: '/p1.png',
    },
    {
      title: 'Aceternity UI',
      link: 'https://ui.aceternity.com',
      thumbnail: '/p2.png',
    },
    {
      title: 'Tailwind Master Kit',
      link: 'https://tailwindmasterkit.com',
      thumbnail: '/p3.png',
    },
    {
      title: 'SmartBridge',
      link: 'https://smartbridgetech.com',
      thumbnail: '/p4.png',
    },
    {
      title: 'Renderwork Studio',
      link: 'https://renderwork.studio',
      thumbnail: '/p5.png',
    },
  
    {
      title: 'Creme Digital',
      link: 'https://cremedigital.com',
      thumbnail: '/p6.png',
    },
    {
      title: 'Golden Bells Academy',
      link: 'https://goldenbellsacademy.com',
      thumbnail: '/p1.png',
    },
    {
      title: 'Invoker Labs',
      link: 'https://invoker.lol',
      thumbnail: '/p2.png',
    },
    {
      title: 'E Free Invoice',
      link: 'https://efreeinvoice.com',
      thumbnail: '/p3.png',
    },
  ]
  

  export const EditorCanvasDefaultCardTypes = {
    Email: { description: 'Send and email to a user', type: 'Action' },
    Condition: {
      description: 'Boolean operator that creates different conditions lanes.',
      type: 'Action',
    },
    AI: {
      description:
        'Use the power of AI to summarize, respond, create and much more.',
      type: 'Action',
    },
    Slack: { description: 'Send a notification to slack', type: 'Action' },
    'Google Drive': {
      description:
        'Connect with Google drive to trigger actions or to create files and folders.',
      type: 'Trigger',
    },
    Notion: { description: 'Create entries directly in notion.', type: 'Action' },
    'Custom Webhook': {
      description:
        'Connect any app that has an API key and send data to your applicaiton.',
      type: 'Action',
    },
    Discord: {
      description: 'Post messages to your discord server',
      type: 'Action',
    },
    'Google Calendar': {
      description: 'Create a calendar invite.',
      type: 'Action',
    },
    Trigger: {
      description: 'An event that starts the workflow.',
      type: 'Trigger',
    },
    Action: {
      description: 'An event that happens after the workflow begins',
      type: 'Action',
    },
    Wait: {
      description: 'Delay the next action step by using the wait timer.',
      type: 'Action',
    },
  }
  
  export const CONNECTIONS: Connection[] = [
    {
      title: 'Google Drive',
      description: 'Connect your google drive to listen to folder changes',
      image: '/googleDrive.png',
      connectionKey: 'googleNode',
      alwaysTrue: true,
    },
    {
      title: 'Discord',
      description: 'Connect your discord to send notification and messages',
      image: '/discord.png',
      connectionKey: 'discordNode',
      accessTokenKey: 'webhookURL',
    },
    {
      title: 'Notion',
      description: 'Create entries in your notion dashboard and automate tasks.',
      image: '/notion.png',
      connectionKey: 'notionNode',
      accessTokenKey: 'accessToken',
    },
    {
      title: 'Slack',
      description:
        'Use slack to send notifications to team members through your own custom bot.',
      image: '/slack.png',
      connectionKey: 'slackNode',
      accessTokenKey: 'slackAccessToken',
      slackSpecial: true,
    },
  ]