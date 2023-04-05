import React from "react";
import {
  Controller,
  useFormContext,
  useController,
  get,
} from "react-hook-form";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export const DateField = ({ ...props }) => {
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
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                inputRef={ref}
                autoComplete="off"
                fullWidth
                format="DD/MM/YYYY"
                label={props.label}
                value={field.value ? field.value : ""}
                required
                size="small"
                shrink="true"
                error={error?.message ? true : false}
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            </LocalizationProvider>
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
