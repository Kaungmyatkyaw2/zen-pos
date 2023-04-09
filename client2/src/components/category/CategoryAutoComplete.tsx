import { Autocomplete, Checkbox, Chip, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Close, ArrowDropDown } from "@mui/icons-material";
import { Category } from "../../types";
import { useEffect, useState } from "react";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" color="error" />;
const checkedIcon = <CheckBoxIcon fontSize="small" color="error" />;

interface propType {
  chose: Category[];
  org: Category[];
  add: (data: any) => void;
  title: string;
}
export const CategoryAutoComplete = ({ add, chose, org, title }: propType) => {
  return (
    <Autocomplete
      size="small"
      multiple
      isOptionEqualToValue={(option, value) => {
        return option?.id === value?.id;
      }}
      onChange={(e, selected) => {
        add(selected || null);
      }}
      value={chose || null}
      options={org}
      id="fixed-tags-demo"
      getOptionLabel={(option) => option?.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8, zIndex: "999999" }}
            checked={selected}
          />
          {option?.name}
        </li>
      )}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          className="text-main"
          {...params}
          label={title}
          placeholder={`Search ` + title}
          sx={{
            "& .MuiInputBase-root": {
              color: "white",
              fontSize: "14px",
            },
            "& label.Mui-focused": {
              color: "white",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#EF4444",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "gray",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EF4444",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "var(--color-text)" },
          }}
        />
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            sx={{
              "& .MuiChip-deleteIcon": {
                color: "white",
              },
            }}
            style={{
              backgroundColor: "#393C49",
              color: "whitesmoke",
            }}
            label={option?.name}
            {...getTagProps({ index })}
            className="bg-white"
            key={index}
          />
        ))
      }
      clearIcon={
        <Close fontSize="small" style={{ color: "var(--color-text)" }} />
      }
      popupIcon={<ArrowDropDown fontSize="small" style={{ color: "gray" }} />}
    />
  );
};
