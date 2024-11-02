import { WorkflowFormSchema } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/Images/External/UI/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/Images/External/UI/form'
import { Input } from '@/Components/Images/External/UI/input'
import { Button } from '@/Components/Images/External/UI/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useModal } from '@/providers/ModalValueProvider'
import { MESSAGE_HANDLER_SONNER, MessageConfiguration } from '@/Events/SonnerMessageDispatch'

async function onCreateWorkflow(name: string, description: string) {
  try {
    const response = await fetch('/api/workflows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    })

    if (!response.ok) {
      throw new Error('Failed to create workflow')
    }

    const data = await response.json()
    return { message: 'Workflow created successfully!', data }
  } catch (error) {
    console.error(error)
    return null
  }
}

type Props = {
  title?: string
  subTitle?: string
  onWorkflowCreated?: () => void // Optional callback after workflow creation
}

const WorkflowForm = ({ title, subTitle, onWorkflowCreated }: Props) => {
  const { setClose } = useModal()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof WorkflowFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(WorkflowFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const handleSubmit = async (values: z.infer<typeof WorkflowFormSchema>) => {
    setIsLoading(true)
    const workflow = await onCreateWorkflow(values.name, values.description)
    setIsLoading(false)

    if (workflow) {
        console.log('success')
      toast.success('Workflow created successfully!')
      setClose()
      onWorkflowCreated?.() // Call the callback if provided
    } else {
      MESSAGE_HANDLER_SONNER('Error Notification' , 'Something went wrong , have to create API' , MessageConfiguration.ERR_M)
    }
  }

  return (
    <Card className="w-full max-w-[650px] border-none">
      {title && subTitle && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subTitle}</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4 text-left"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Name"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Description"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-4"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default WorkflowForm
