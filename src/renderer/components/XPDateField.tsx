import { TextField, TextFieldProps } from '@mui/material';

interface XPDateFieldProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
}

export default function XPDateField({ value, onChange, ...rest }: XPDateFieldProps) {
  const formatarData = (texto: string) => {
    let val = texto.replace(/\D/g, '');
    if (val.length > 8) val = val.slice(0, 8);
    if (val.length > 4) val = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4)}`;
    else if (val.length > 2) val = `${val.slice(0, 2)}/${val.slice(2)}`;
    return val;
  };

  return (
    <TextField
      {...rest}
      value={value}
      onChange={(e) => onChange(formatarData(e.target.value))}
    />
  );
}
