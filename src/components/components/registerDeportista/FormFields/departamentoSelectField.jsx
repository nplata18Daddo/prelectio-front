import React from "react";
import { MenuItem, Select } from "@mui/material";
import {
  Controller,
  useFormContext,
  useController,
  get,
} from "react-hook-form";

export const DptoSelectField = ({ ...props }) => {
  const { fieldState } = useController(props);
  const { control } = useFormContext();
  const { _formState } = control;
  const error = get(_formState.errors, props.name);
  const errorText = fieldState.invalid ? error.message : "";

  return (
    <>
      <Controller
        {...props}
        render={({ field: { ref, ...field } }) => (
          <Select
            inputRef={ref}
            autoComplete="off"
            fullWidth
            label={props.label}
            value={field.value ? field.value : 0}
            required
            size="small"
            shrink="true"
            error={error?.message ? true : false}
            onChange={(e) => {
              field.onChange(e.target.value);
              props.setSelectedDpto(e.target.value);
            }}
          >
            {props.options.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        )}
        rules={{ required: true }}
        variant="outlined"
        size="small"
        control={control}
        helperText={errorText ? errorText : props.helperText}
        error={!!errorText}
        defaultValue={props.defaultValue}
      />
    </>
  );
};
