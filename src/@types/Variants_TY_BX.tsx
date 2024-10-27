import React, { useMemo } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { useTheme, Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { memo } from 'react';
import { TextTypeIdentifier } from '@/Constants/structure';

interface CustomTextProps {
  children?: React.ReactNode;
  color?: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  sx?: SxProps<Theme>; 
  type?: TextTypeIdentifier;
  id?: string;
  keyPattern?: string;
  as?: keyof JSX.IntrinsicElements; 
}

const typographyVariantMap: Record<TextTypeIdentifier, TypographyProps['variant']> = {
  [TextTypeIdentifier.H1]: 'h1',
  [TextTypeIdentifier.H2]: 'h2',
  [TextTypeIdentifier.H3]: 'h3',
  [TextTypeIdentifier.H6]: 'h6',
  [TextTypeIdentifier.Title]: 'h5',
  [TextTypeIdentifier.Subtitle]: 'subtitle1',
  [TextTypeIdentifier.Body]: 'body1',
  [TextTypeIdentifier.Body2]: 'body2',
  [TextTypeIdentifier.BodyLarge]: 'h4', 
  [TextTypeIdentifier.Caption]: 'caption',
  [TextTypeIdentifier.CaptionBold]: 'caption',
  [TextTypeIdentifier.Micro]: 'overline', 
  [TextTypeIdentifier.TitleText]: 'h4',
  [TextTypeIdentifier.Default]: 'body1',
};

const getTypographyVariant = (type: TextTypeIdentifier | undefined): TypographyProps['variant'] => {
  return typographyVariantMap[type || TextTypeIdentifier.Default];
};
const CustomText: React.FC<CustomTextProps> = memo(
  ({ children, style, color, type = TextTypeIdentifier.Default, className, onClick, id, sx, as = 'p', ...rest }) => {
    const theme: Theme = useTheme();
    const computedStyle = useMemo(() => {
      return {
        ...style,
        color: color || style?.color || theme.palette.text.primary,
        fontWeight: type === TextTypeIdentifier.CaptionBold ? 700 : undefined,
        fontSize: type === TextTypeIdentifier.TitleText ? '24px' : undefined,
        lineHeight: type === TextTypeIdentifier.TitleText ? '32px' : undefined, 
        transition: 'color 0.2s ease-in-out',
        fontFamily: theme.typography.fontFamily,
        display: as === 'span' ? 'inline' : 'block',
      };
    }, [style, color, type, theme, as]);

    return (
      <Typography component={as} variant={getTypographyVariant(type)} onClick={onClick}className={className} style={computedStyle} id={id} sx={sx} {...rest}
      >
        {children}
      </Typography>
    );
  }
);

CustomText.defaultProps = {
  children: '',
  type: TextTypeIdentifier.Body,
};

export default CustomText;
