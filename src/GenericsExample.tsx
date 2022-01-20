import React, { useState } from 'react';
import CheckboxArray from './CheckboxArray';
import RigidCheckboxArray from './RigidCheckboxArray';

const colors = ['red', 'green', 'blue', 'yellow'];
const numbers = [1, 2, 3, 4, 5];
const numbersOrStrings = ['foo', 'bar', 20, 21];

const GenericsExample = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([]);

  return (
    <div className="grid">
      <div className="col-1-2">
        Selected Colors: {selectedColors.join(',')}
        <br />
        Selected Numbers: {selectedNumbers.join(',')}
        <br />
        Selected Values: {selectedValues.join(',')}
      </div>
      <div className="col-1-2">
        <CheckboxArray
          values={colors}
          selected={selectedColors}
          onChange={setSelectedColors}
        />
        <CheckboxArray
          values={numbers}
          selected={selectedNumbers}
          onChange={setSelectedNumbers}
        />
        <CheckboxArray
          values={numbersOrStrings}
          selected={selectedValues}
          onChange={setSelectedValues}
        />
        {/*<RigidCheckboxArray
           values={colors}
           selected={selectedColors}
           onChange={setSelectedColors}
           />*/}
      </div>
    </div>
  );
};

export default GenericsExample;
