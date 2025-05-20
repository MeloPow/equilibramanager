import { TextField, TextFieldProps } from '@mui/material';

interface XPCPFFieldProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
   value: string;
   onChange: (value: string) => void;
}

export default function XPCPFField({ value, onChange, ...rest }: XPCPFFieldProps) {
   const formatarCPF = (val: string) => {
      val = val.replace(/\D/g, '');
      if (val.length > 11) val = val.slice(0, 11);
      if (val.length > 9)
         return `${val.slice(0, 3)}.${val.slice(3, 6)}.${val.slice(6, 9)}-${val.slice(9)}`;
      else if (val.length > 6)
         return `${val.slice(0, 3)}.${val.slice(3, 6)}.${val.slice(6)}`;
      else if (val.length > 3)
         return `${val.slice(0, 3)}.${val.slice(3)}`;
      else
         return val;
   };

   return (
      <TextField
         {...rest}
         value={value}
         onChange={(e) => onChange(formatarCPF(e.target.value))}
      />
   );
}
