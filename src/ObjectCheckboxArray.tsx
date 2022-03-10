import React from "react";
import { without } from "lodash";

const ObjectCheckboxArray = <
  Value extends string | number,
  OptionType extends { label: string; value: Value },
>({
  options,
  selected,
  onChange,
  onChangeComplex,
}: {
  options: OptionType[];
  selected: Value[];
  onChange: (value: Value[]) => void;
  onChangeComplex: (options: OptionType[]) => void;
}): React.ReactElement => {
  const onInputChange = (value: Value) => {
    const values = selected.includes(value)
      ? without(selected, value)
      : [...selected, value];
    const selectedOptions = options.filter(({ value }) =>
      values.includes(value)
    );
    onChange(values);
    onChangeComplex(selectedOptions);
  };

  return (
    <>
      {options.map(({ label, value }: OptionType) => (
        <>
          <label htmlFor={`#${String(label)}`}>{label}</label>
          <input
            value={value}
            key={label}
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

export default ObjectCheckboxArray;
