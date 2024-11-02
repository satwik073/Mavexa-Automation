import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../ui/drawer'

import { useModal } from "@/providers/ModalValueProvider"

import React, { ReactNode } from 'react'
import { Button } from "../Images/External/UI/button"

type Props = {
    title: string
    subheading: string
    children: ReactNode
    defaultOpen?: boolean
}
const CustomModal = ({ children, subheading, title, defaultOpen }: Props) => {
    const { isOpen, setClose } = useModal()
    const handleClose = () => setClose()

    return (
        <Drawer
            open={isOpen}
            onClose={handleClose}
        >
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-center">{title}</DrawerTitle>
                    <DrawerDescription className="text-center flex flex-col items-center gap-4 h-96">
                        {subheading}
                        {children}
                    </DrawerDescription>
                </DrawerHeader>
                {/* <DrawerFooter className="flex flex-col gap-4 bg-background border-t-[1px] border-t-muted">
                    <DrawerClose>
                        <Button
                            variant="ghost"
                            className="w-full"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter> */}
            </DrawerContent>
        </Drawer>
    )
}

export default CustomModal