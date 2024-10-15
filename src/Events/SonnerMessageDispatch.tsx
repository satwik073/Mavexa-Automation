import React from 'react';
import { toast } from '@/Hooks/useToast';
import { BsCheck2Circle, BsExclamationCircle } from 'react-icons/bs';
import { HiOutlineExclamation, HiOutlineSparkles } from 'react-icons/hi'; 
import { IoWarningOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { GiGearStickPattern } from "react-icons/gi";

export enum MessageConfiguration {
    ERR_M = 'error',
    SC_M = 'success',
    IN_O = 'info',
    WAR_G = 'warning',
    DEFAULT = 'default',
    
}

const iconMapping: Record<MessageConfiguration, React.ElementType> = {
    [MessageConfiguration.SC_M]: BsCheck2Circle,//
    [MessageConfiguration.ERR_M]: RxCrossCircled, //
    [MessageConfiguration.IN_O]: AiOutlineInfoCircle,//
    [MessageConfiguration.WAR_G]: IoWarningOutline,//
    [MessageConfiguration.DEFAULT]: GiGearStickPattern,//
};

export const MESSAGE_HANDLER_SONNER = (
    titleAttached: React.ReactNode,
    messageOptions: React.ReactNode,
    typeDeclaration: MessageConfiguration,
) => {

    const IconComponent = iconMapping[typeDeclaration];

    const toastProps = {
        title: (
            <div className="flex items-center">
                {IconComponent ? (
                    <IconComponent className={getIconClass(typeDeclaration)}  size={20}/>
                ) : null}
                <span className="ml-2">{titleAttached}</span>
            </div>
        ),
        description: messageOptions,
        duration: 5000,
    };

    const toastVariant = {
        [MessageConfiguration.SC_M]: 'success',
        [MessageConfiguration.ERR_M]: 'destructive',
        [MessageConfiguration.IN_O]: 'info',
        [MessageConfiguration.WAR_G]: 'warning',
        [MessageConfiguration.DEFAULT]: 'default',
    }[typeDeclaration] || 'default';

    toast({ ...toastProps, variant: toastVariant });
};


const getIconClass = (typeDeclaration: MessageConfiguration): string => {
    switch (typeDeclaration) {
        case MessageConfiguration.SC_M:
            return 'text-green-500';
        case MessageConfiguration.ERR_M:
            return 'text-red-500';
        case MessageConfiguration.IN_O:
            return 'text-blue-500';
        case MessageConfiguration.WAR_G:
            return 'text-yellow-500';
        default:
            return 'text-gray-500';
    }
};
