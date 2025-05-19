import { TextField, TextFieldProps } from '@mui/material';

interface XPPhoneFieldProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
   value: string;
   onChange: (value: string) => void;
}

export default function XPPhoneField({ value, onChange, ...rest }: XPPhoneFieldProps) {
   const formatarTelefone = (val: string) => {
      val = val.replace(/\D/g, '');
      if (val.length > 11) val = val.slice(0, 11);
      if (val.length > 6)
         return `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
      else if (val.length > 2)
         return `(${val.slice(0, 2)}) ${val.slice(2)}`;
      else
         return val;
   };

   return (
      <TextField
         {...rest}
         value={value}
         onChange={(e) => onChange(formatarTelefone(e.target.value))}
      />
   );
}
