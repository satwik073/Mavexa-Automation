import CustomBox from '@/@types/Comp_BX';
import { Box } from '@mui/material';
import React, { FC } from 'react';
import { MESSAGE_HANDLER_SONNER } from '@/Events/SonnerMessageDispatch';
import { MessageConfiguration } from '@/Events/SonnerMessageDispatch';
import { BoxTypeIdentifier } from '@/Constants/structure';

interface ContentBlockSettings {
    titleText: string;
    descriptionText: string;
    messageType: MessageConfiguration;
}

const TitleDescriptionBlock: FC<ContentBlockSettings> = ({ titleText, descriptionText, messageType }) => {

    const handleMessageDispatch = () => {
        MESSAGE_HANDLER_SONNER(titleText, descriptionText, messageType);
    };

    const titleContentCell = (
        <Box component={BoxTypeIdentifier.Default} className="flex items-center">
            <CustomBox type={BoxTypeIdentifier.Section} className="mx-1 font-normal">{titleText}</CustomBox>
        </Box>
    );

    const descriptionCell = (
        <Box component={BoxTypeIdentifier.Default} className="mt-2 bg-slate-950 py-3 rounded-lg px-2">
            <pre className="text-white text-xs w-full">
                <code className="whitespace-pre-wrap text-ellipsis text-xs text-justify">
                    {descriptionText}
                </code>
            </pre>
        </Box>
    );

    return (
        <Box className="flex flex-col items-start" onClick={handleMessageDispatch}>
            <CustomBox className='mx-1 font-normal'>
                {titleContentCell}
            </CustomBox>
            <CustomBox>
                {descriptionCell}
            </CustomBox>
        </Box>
    );
};

export default TitleDescriptionBlock;
