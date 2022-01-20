import React from "react";
import { without } from 'lodash';

type Value = string | number;

const CheckboxArray = ({
  values,
  selected,
  onChange,
}: {
  values: Value[];
  selected: Value[];
  onChange: (value: Value[]) => void;
}): React.ReactElement => {
  const onInputChange = (value: Value) => {
    if (selected.includes(value)) {
      onChange(without(selected, value));
    } else {
      onChange([
        ...selected,
        value
      ]);
    }
  };

  return (
    <>
      {values.map((value: Value) => (
        <>
          <label htmlFor={`#${String(value)}`}>{value}</label>
          <input
            value={value}
            key={value}
            id={String(value)}
            type="checkbox"
            checked={selected.includes(value)}
            onChange={() => onInputChange(value)}
          />
          <br />
        </>
      ))}
    </>
  );
};

export default CheckboxArray;
