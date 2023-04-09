import React, { HTMLProps } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Choice, Option } from "../../types";

interface PropType extends HTMLProps<HTMLInputElement> {
  option: Option;
  addChoice: (data: Choice) => void;
  chosenChoice: Choice[];
}

export const OptionRadioBox = ({
  option,
  addChoice,
  chosenChoice,
}: PropType) => {

  return (
    <FormControl>
      <FormLabel
        id="demo-radio-buttons-group-label"
        style={{ color: "#d1d5dbd9", fontWeight: "bold", fontSize: "17px" }}
      >
        {option.name}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name={option.name}
        onChange={(e) => {
          addChoice(JSON.parse(e.currentTarget.value));
        }}
      >
        {option?.choices?.map((c) => (
          <FormControlLabel
            key={c.id}
            value={JSON.stringify(c)}
            control={
              <Radio
                checked={chosenChoice?.map((i) => i.id).includes(c.id)}
                sx={{
                  "&, &.Mui-checked": {
                    color: "#EA7C69",
                  },
                }}
              />
            }
            label={<span className="text-gray-200 text-sm">{c.name}</span>}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
