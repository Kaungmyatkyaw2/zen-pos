import React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Choice, Option } from "../../types";
import { Checkbox } from "@mui/material";

interface PropType {
  option: Option;
  addChoice: (data: Choice) => void;
  removeChoice: (data: Choice) => void;
  chosenChoice: Choice[];
}

export const OptionCheckBox = ({
  option,
  addChoice,
  removeChoice,
  chosenChoice,
}: PropType) => {
  return (
    <FormControl>
      <div className="flex items-center justify-between">
        <FormLabel id="demo-radio-buttons-group-label">
          <p className="text-[17px] fontbold text-[#d1d5dbd9]">{option.name}</p>
          <p className="text-[12px] py-[2px] text-white">
            Select al least {option.min} , up to {option.max}
          </p>
        </FormLabel>
        <h1 className="bg-white text-black rounded-full px-[15px] py-[3px]">
          Require
        </h1>
      </div>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name={option.name}
      >
        {option?.choices?.map((c) => (
          <FormControlLabel
            key={c.id}
            control={
              <Checkbox
                defaultChecked={chosenChoice?.map((i) => i.id).includes(c.id)}
                onChange={(e) =>
                  e.target.checked ? addChoice(c) : removeChoice(c)
                }
                style={{
                  color: "#EA7C69",
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
