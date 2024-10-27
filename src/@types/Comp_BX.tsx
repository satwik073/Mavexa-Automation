import React, { useMemo, FC, memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { useTheme, Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { BoxTypeIdentifier } from '@/Constants/structure';

interface CustomBoxProps extends BoxProps {
  children?: React.ReactNode;
  color?: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  sx?: SxProps<Theme>;
  type?: BoxTypeIdentifier; 
  id?: string;
  as?: keyof JSX.IntrinsicElements; 
}
const boxElementMap: Record<BoxTypeIdentifier, keyof JSX.IntrinsicElements> = {
    [BoxTypeIdentifier.Div || BoxTypeIdentifier.Default]: 'div',
    [BoxTypeIdentifier.Nav]: 'nav',
    [BoxTypeIdentifier.Section]: 'section',
    [BoxTypeIdentifier.Header]: 'header',
    [BoxTypeIdentifier.Footer]: 'footer',
    [BoxTypeIdentifier.Article]: 'article',
    [BoxTypeIdentifier.Aside]: 'aside',
    [BoxTypeIdentifier.Main]: 'main',
    [BoxTypeIdentifier.H1]: 'h1',
    [BoxTypeIdentifier.H2]: 'h2',
    [BoxTypeIdentifier.H3]: 'h3',
    [BoxTypeIdentifier.H4]: 'h4',
    [BoxTypeIdentifier.H5]: 'h5',
    [BoxTypeIdentifier.H6]: 'h6',
    [BoxTypeIdentifier.P]: 'p',
    [BoxTypeIdentifier.Span]: 'span',
    [BoxTypeIdentifier.A]: 'a',
    [BoxTypeIdentifier.Img]: 'img',
    [BoxTypeIdentifier.Table]: 'table',
    [BoxTypeIdentifier.Thead]: 'thead',
    [BoxTypeIdentifier.Tbody]: 'tbody',
    [BoxTypeIdentifier.Tr]: 'tr',
    [BoxTypeIdentifier.Td]: 'td',
    [BoxTypeIdentifier.Th]: 'th',
    [BoxTypeIdentifier.Ul]: 'ul',
    [BoxTypeIdentifier.Ol]: 'ol',
    [BoxTypeIdentifier.Li]: 'li',
    [BoxTypeIdentifier.Form]: 'form',
    [BoxTypeIdentifier.Input]: 'input',
    [BoxTypeIdentifier.Button]: 'button',
    [BoxTypeIdentifier.Label]: 'label',
    [BoxTypeIdentifier.Select]: 'select',
    [BoxTypeIdentifier.Textarea]: 'textarea',
    [BoxTypeIdentifier.Video]: 'video',
    [BoxTypeIdentifier.Audio]: 'audio',
    [BoxTypeIdentifier.Details]: 'details',
    [BoxTypeIdentifier.Summary]: 'summary',
    [BoxTypeIdentifier.Dialog]: 'dialog',
    [BoxTypeIdentifier.Output]: 'output'
};

const getBoxElement = (type: BoxTypeIdentifier | undefined): keyof JSX.IntrinsicElements => {
  return boxElementMap[type || BoxTypeIdentifier.Default];
};

const CustomBox: FC<CustomBoxProps> = memo(
  ({ children, style, color, type = BoxTypeIdentifier.Default, className, onClick, id, sx, as = 'div', ...rest }) => {
    const theme: Theme = useTheme();
    const component = getBoxElement(type);

    const computedStyle = useMemo(() => {
      return {
        ...style,
        color: color || style?.color || theme.palette.text.primary,
        transition: 'color 0.2s ease-in-out',
        fontFamily: theme.typography.fontFamily,
      };
    }, [style, color, theme]);

    return (
      <Box component={component} onClick={onClick} className={className} id={id} sx={sx} style={computedStyle} {...rest}
      >
        {children}
      </Box>
    );
  }
);

CustomBox.defaultProps = {
  children: null,
  type: BoxTypeIdentifier.Default,
};

export default CustomBox;
