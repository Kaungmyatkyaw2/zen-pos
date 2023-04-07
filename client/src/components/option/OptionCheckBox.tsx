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
}

export const OptionCheckBox = ({
  option,
  addChoice,
  removeChoice,
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
      >
        {option?.choices?.map((c) => (
          <FormControlLabel
            key={c.id}
            control={
              <Checkbox
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
