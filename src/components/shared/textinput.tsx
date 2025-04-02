'use client';

import { TextInput, Button, Grid, Column } from "@carbon/react";

interface CustomTextInputProps {
  value: string;
  className?: string;
  helperText?: string;
  id: string;
  disabled?: boolean;
  invalidText?: string;
  labelText: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: string;
  warnText?: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

const CustomTextInput = ({
  className,
  value,
  helperText,
  id,
  invalidText,
  labelText,
  onChange,
  onClick,
  disabled,
  placeholder,
  size = 'md',
  type = 'text',
  warnText,
  showButton = false,
  buttonText,
  onButtonClick,
}: CustomTextInputProps) => {


  return (
    <Grid>
      <Column sm={4} md={8} lg={12}>
        <TextInput
          className={className}
          value={value}
          helperText={helperText}
          id={id}
          invalidText={invalidText}
          labelText={labelText}
          onChange={onChange}
          onClick={onClick}
          placeholder={placeholder}
          size={size}
          type={type}
          warnText={warnText}
          disabled={disabled}
        />
      </Column>
      {showButton && (
        <Column sm={2} md={4} lg={4}>
          <Button onClick={onButtonClick}>
            {buttonText}
          </Button>
        </Column>
      )}
    </Grid>
  );
};

export default CustomTextInput;
