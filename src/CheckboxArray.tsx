import React from "react";
import { without } from 'lodash';

const CheckboxArray = <V extends string | number>({
  values,
  selected,
  onChange,
}: {
  values: V[];
  selected: V[];
  onChange: (value: V[]) => void;
}): React.ReactElement => {
  const onInputChange = (value: V) => {
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
      {values.map((value: V) => (
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
