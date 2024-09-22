import {z} from 'zod'
export const EditUserProfileSchema = z.object({
    name: z.string().nonempty('Name is required'),
    email: z.string().email('Invalid email address'),
  });

  
export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'