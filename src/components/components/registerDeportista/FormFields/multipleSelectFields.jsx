import React from "react";
import {
  Box,
  Checkbox,
  Chip,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Controller,
  useFormContext,
  useController,
  get,
} from "react-hook-form";

export const MultipleSelectField = ({ ...props }) => {
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
            <Select
              sx={{
                border: "1px solid white",
                borderRadius: "5px",
                "& ::placeholder": {
                  color: "white",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
              inputProps={{
                sx: {
                  color: "red",
                  borderColor: "white",
                },
              }}
              multiple
              inputRef={ref}
              autoComplete="off"
              fullWidth
              label={props.label}
              value={field.value ? field.value : 0}
              required
              size="small"
              shrink="true"
              error={error?.message ? true : false}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected
                    .map((item) => {
                      return props.options.find(function (option, i) {
                        if (option.value === item) {
                          return option.label;
                        }
                      });
                    })
                    .map((a) => {
                      return (
                        <Chip
                          style={{ color: "white", backgroundColor: "#484848" }}
                          key={a.value}
                          label={a.label}
                        />
                      );
                    })}
                </Box>
              )}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            >
              <MenuItem disabled value={0}>
                {props.placeholder}
              </MenuItem>
              {props.options.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.value}>
                    <Checkbox checked={field.value.includes(item.value)} />
                    <ListItemText primary={item.label} />
                  </MenuItem>
                );
              })}
            </Select>{" "}
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
