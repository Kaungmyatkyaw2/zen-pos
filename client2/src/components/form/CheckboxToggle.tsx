import { Switch } from "@mui/material";
import React from "react";

interface PropType extends React.HTMLProps<HTMLInputElement> {
  leftName?: string;
  rightName?: string;
}

const label = { inputProps: { "aria-label": "Switch demo" } };

export const CheckboxToggle = ({ leftName, rightName, ...rest }: PropType) => {
  return (
    <label htmlFor={rest.name} className="relative inline-flex items-center">
      {leftName && (
        <span className="mr-3 text-sm font-medium text-white dark:text-gray-300">
          {leftName}
        </span>
      )}
      <div>
        <Switch
          defaultChecked={rest.defaultChecked}
          checked={rest.checked}
          onChange={rest.onChange}
          {...label}
        />
      </div>
      {rightName && (
        <span className="ml-3 text-sm font-medium text-white dark:text-gray-300">
          {rightName}
        </span>
      )}
    </label>
  );
};
