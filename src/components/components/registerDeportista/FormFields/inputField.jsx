import React from "react";
import { TextField } from "@mui/material";
import {
  Controller,
  useFormContext,
  useController,
  get,
} from "react-hook-form";

export const InputField = ({ ...props }) => {
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
          <>
            <TextField
              sx={{
                border: "1px solid white",
                borderRadius: "5px",
                "& ::placeholder": {
                  color: "white",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "white",
                  borderColor: "white",
                },
              }}
              inputProps={{
                sx: {
                  color: "red",
                  borderColor: "white",
                },
              }}
              inputRef={ref}
              autoComplete="off"
              fullWidth
              label=""
              placeholder={props.label}
              value={field.value ? field.value : ""}
              required
              size="small"
              shrink="true"
              error={error?.message ? true : false}
              onChange={(e) => field.onChange(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </>
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
