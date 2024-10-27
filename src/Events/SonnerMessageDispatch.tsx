import React from 'react';
import { toast } from '@/Hooks/useToast';
import { BsCheck2Circle, BsExclamationCircle } from 'react-icons/bs';
import { HiOutlineExclamation, HiOutlineSparkles } from 'react-icons/hi';
import { IoWarningOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { GiGearStickPattern } from "react-icons/gi";
import { BoxTypeIdentifier } from '@/Constants/structure';
import CustomBox from '@/@types/Comp_BX';
import { Box } from 'lucide-react';
import CustomText from '@/@types/Variants_TY_BX';

export enum MessageConfiguration {
    ERR_M = 'error',
    SC_M = 'success',
    IN_O = 'info',
    WAR_G = 'warning',
    DEFAULT = 'default',
}

const iconMapping: Record<MessageConfiguration, React.ElementType> = {
    [MessageConfiguration.SC_M]: BsCheck2Circle,
    [MessageConfiguration.ERR_M]: RxCrossCircled,
    [MessageConfiguration.IN_O]: AiOutlineInfoCircle,
    [MessageConfiguration.WAR_G]: IoWarningOutline,
    [MessageConfiguration.DEFAULT]: GiGearStickPattern,
};

export const MESSAGE_HANDLER_SONNER = (
    titleAttached: string, 
    messageOptions: string, 
    typeDeclaration: MessageConfiguration,
) => {
    const IconComponent = iconMapping[typeDeclaration];

    const titleContentCell = (
        <CustomBox type={BoxTypeIdentifier.Default} className="flex items-center">
            {IconComponent && (
                <IconComponent className={getIconClass(typeDeclaration)} size={20} />
            )}
            <CustomBox type={BoxTypeIdentifier.Section} className="mx-1 font-normal">
                <CustomText className=' text-white' >
                    {titleAttached}
                </CustomText>
            </CustomBox>
        </CustomBox>
    );

    const descriptionCell = (
        <CustomBox type={BoxTypeIdentifier.Default} className="mt-2 bg-slate-950 py-3 rounded-lg px-2">
            <pre className="text-white text-xs w-full">
                <code className="whitespace-pre-wrap text-ellipsis text-xs text-justify">
                    {messageOptions}
                </code>
            </pre>
        </CustomBox>
    );

    const toastProps = {
        title: titleContentCell,
        description: descriptionCell,
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
