import React from "react";

export const InputField = ({ ...rest }: React.HTMLProps<HTMLInputElement>) => {
  return (
    <div className="w-full space-y-[5px]">
      <label htmlFor={rest.id}>
        <p className="font-medium">{rest.label}</p>
      </label>
      <input
        {...rest}
        className="p-[10px] w-full bg-softestdark text-[14px] border-[1px] border-softestdark rounded-[4px] outline-none"
        autoComplete="off"
      />
    </div>
  );
};
