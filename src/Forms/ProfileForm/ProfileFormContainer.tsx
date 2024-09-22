'use client'

import  { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Label } from '@/Components/Images/External/UI/label'
import { EditUserProfileSchema } from '@/Constants/types'
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

const ProfileForm = () => {
    const [isLoading] = useState(false)

    const form = useForm<z.infer<typeof EditUserProfileSchema>>({
        mode: 'onChange',
        resolver: zodResolver(EditUserProfileSchema),
        defaultValues: {
            name: 'satwik kanhere',
            email: 'satwikkanhere2003@gmail.com',
        },
    })

    const handleSubmit = async () => {
        // setIsLoading(true)
        // try {
        //   await onpaste(values.name)
        // } catch (error) {
        //   console.error('Failed to update profile:', error)
        // } finally {
        //   setIsLoading(false)
        // }
    }

    //   useEffect(() => {
    //     if (user) {
    //       form.reset({ name: '', email: '' })
    //     }
    //   },  [user])

    return (
        <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
                <Label htmlFor="picture" className='text-lg'>Picture</Label>
                <div className=" w-full grid gap-1.5 h-[30vh] items-center justify-center">
                    <div className="flex items-center justify-center w-full h-full">
                        <Input className='h-full flex items-center w-full' id="picture" type="file" />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">User Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Name" disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">User Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Email" type="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="self-start hover:bg-[#2F006B] hover:text-white"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving
                        </>
                    ) : (
                        'Save User Settings'
                    )}
                </Button>
            </form>
        </Form>
    )
}

export default ProfileForm
