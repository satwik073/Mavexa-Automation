import CustomBox from '@/@types/Comp_BX';
import { Box } from '@mui/material';
import { FC } from 'react';
import { MESSAGE_HANDLER_SONNER } from '@/Events/SonnerMessageDispatch';
import { MessageConfiguration } from '@/Events/SonnerMessageDispatch';
import { BoxTypeIdentifier } from '@/Constants/structure';
import styles from '@/@molecules/Stylesheet/content.module.css';

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
        <Box component={BoxTypeIdentifier.Default} className={styles['title-content-cell']}>
            <CustomBox type={BoxTypeIdentifier.Section} className="mx-1 font-normal">
                {titleText}
            </CustomBox>
        </Box>
    );

    const descriptionCell = (
        <Box component={BoxTypeIdentifier.Default} className={styles['description-cell']}>
            <pre className={styles['description-text']}>
                <code className={styles['code-block']}>
                    {descriptionText}
                </code>
            </pre>
        </Box>
    );

    return (
        <Box className={`${styles['main-container']}`} onClick={handleMessageDispatch}>
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
