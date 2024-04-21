import { useState } from "react";

const options = [
  "Dissatisfied(0%)",
  "It was Okey(5%)",
  "It was Good(10%)",
  "Amazing!(20%)",
];

export default function App() {
  const [input, setInput] = useState(0);

  const [firstSelect, setFirstSelect] = useState(0);
  const [secondSelect, setSecondSelect] = useState(0);

  const percent = () => {
    const find = (val) => {
      val = Number(val);
      switch (val) {
        case 0:
          return 0;
        case 1:
          return 5;
        case 2:
          return 10;
        case 3:
          return 20;
        default:
          return 0;
      }
    };
    if (!input) return 0;

    const firstValue = find(firstSelect);
    const secondValue = find(secondSelect);

    return (((firstValue + secondValue) / 100) * input).toFixed(2);
  };

  const reset = () => {
    setFirstSelect(0);
    setSecondSelect(0);
    setInput(0);
  };

  return (
    <>
      <Bill
        text="How much was the bill? "
        onSetInput={setInput}
        input={input}
      ></Bill>
      <SelectInput
        text="How did you like the service?"
        options={options}
        selectVal={firstSelect}
        onSetSelect={setFirstSelect}
      />
      <SelectInput
        text="How did your friend like the service?"
        options={options}
        selectVal={secondSelect}
        onSetSelect={setSecondSelect}
      />
      {input ? <FinalValues value={input} percent={percent()} /> : ""}

      {input ? <Button reset={reset}></Button> : ""}
    </>
  );
}

function Bill({ text, input, onSetInput }) {
  return (
    <div>
      <span>{text}</span>
      <input
        type="number"
        value={input}
        onChange={(e) => onSetInput(Number(e.target.value))}
      />
    </div>
  );
}

function SelectInput({ text, options, selectVal, onSetSelect }) {
  return (
    <div>
      <span>{text}</span>
      <select
        value={selectVal}
        onChange={(e) => {
          onSetSelect(e.target.value);
        }}
      >
        {options.map((el, i) => (
          <option value={i} key={i}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}

function FinalValues({ value, percent }) {
  const totalValue = Number(value) + Number(percent);
  return (
    <h2>
      You Pay ${totalValue} {"("} ${value} + ${percent} {")"}{" "}
    </h2>
  );
}

function Button({ reset }) {
  return <button onClick={reset}>Reset</button>;
}
