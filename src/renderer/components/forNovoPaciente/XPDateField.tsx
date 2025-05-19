// src/renderer/components/XPDateField.tsx
import { TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';

interface XPDateFieldProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
}

function isDataValida(data: string): boolean {
  const partes = data.split('/');
  if (partes.length !== 3) return false;

  const [diaStr, mesStr, anoStr] = partes;
  const dia = parseInt(diaStr, 10);
  const mes = parseInt(mesStr, 10);
  const ano = parseInt(anoStr, 10);

  if (isNaN(dia) || isNaN(mes) || isNaN(ano)) return false;
  if (anoStr.length !== 4 || ano < 1900) return false;
  if (mes < 1 || mes > 12) return false;

  const diasNoMes = new Date(ano, mes, 0).getDate();
  if (dia < 1 || dia > diasNoMes) return false;

  const dataObj = new Date(ano, mes - 1, dia);
  const hoje = new Date();

  return dataObj <= hoje;
}

export default function XPDateField({ value, onChange, ...rest }: XPDateFieldProps) {
  const [erro, setErro] = useState(false);

  const formatarData = (texto: string): string => {
    let val = texto.replace(/\D/g, '');
    if (val.length > 8) val = val.slice(0, 8);
    if (val.length >= 5) val = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4)}`;
    else if (val.length >= 3) val = `${val.slice(0, 2)}/${val.slice(2)}`;
    return val;
  };

  const tratarMudanca = (texto: string) => {
    const formatado = formatarData(texto);

    if (formatado.length === 10) {
      const valido = isDataValida(formatado);
      setErro(!valido);
      onChange(formatado);
    } else {
      setErro(false);
      onChange(formatado);
    }
  };

  return (
    <TextField
      {...rest}
      value={value}
      error={erro}
      helperText={erro ? 'Data inválida (verifique dia, mês, ano ou se é futura)' : ''}
      onChange={(e) => tratarMudanca(e.target.value)}
    />
  );
}