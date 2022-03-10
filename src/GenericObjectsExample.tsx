import React, { useState } from 'react';
import CheckboxArray from './ObjectCheckboxArray';

type ColorOption = {
  id: number;
  label: string;
  value: string;
};

const colorOptions: ColorOption[] = [
  { id: 1, label: 'Red', value: 'red' },
  { id: 2, label: 'Green', value: 'green' },
  { id: 3, label: 'Blue', value: 'blue' },
  { id: 4, label: 'Yellow', value: 'yellow' }
];

const GenericObjectsExample = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedColorOptions, setSelectedColorOptions] = useState<ColorOption[]>([]);

  return (
    <div className="grid">
      <div className="col-1-2">
        Selected Colors: {selectedColorOptions.map(({ label }) => label).join(',')}
      </div>
      <div className="col-1-2">
        <CheckboxArray
          options={colorOptions}
          selected={selectedColors}
          onChange={setSelectedColors}
          onChangeComplex={setSelectedColorOptions}
        />
      </div>
    </div>
  );
};

export default GenericObjectsExample;
