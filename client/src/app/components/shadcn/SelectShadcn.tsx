import React, { SetStateAction } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


type SelectProps = {
  placeholder: string;
  options: string[];
  disabled?: boolean;
  value: string;
  handleChangeValue: (e: string) => void,
  w?: string
};

const SelectShadcn: React.FC<SelectProps> = ({ placeholder, options, disabled, value, handleChangeValue, w }) => {

  return (
    <Select disabled={disabled} value={value} onValueChange={handleChangeValue}>
      <SelectTrigger className={`font-bold ${w}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className='max-h-56'>
        {options.map((option, i) => (
          <SelectItem key={i} value={option} className="font-bold">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectShadcn;