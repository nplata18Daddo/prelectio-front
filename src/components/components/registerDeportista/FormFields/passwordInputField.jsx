import { TextField } from "@mui/material";
import React, { useState } from "react";
import { InputGroup } from "react-bootstrap";
import {
  Controller,
  get,
  useController,
  useFormContext,
} from "react-hook-form";

export const PasswordInput = ({ ...props }) => {
  const { fieldState } = useController(props);
  const { control } = useFormContext();
  const { _formState } = control;
  const error = get(_formState.errors, props.name);
  const errorText = fieldState.invalid ? error.message : "";

  const [showPass, setShowPass] = useState(false);
  const [showPassConfirmation, setShowPassConfirmation] = useState(false);

  const handleShowPass = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };
  const handleShowPassConfirmation = (event) => {
    event.preventDefault();
    setShowPassConfirmation(!showPassConfirmation);
  };
  return (
    <>
      <Controller
        {...props}
        render={({ field: { ref, ...field } }) => (
          <>
            <InputGroup>
              <InputGroup.Text className="login__input__icon display__small">
                <i className="bi bi-lock"></i>
              </InputGroup.Text>
              <TextField
                style={{ width: "80%" }}
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
                    color: "white",
                    borderColor: "white",
                  },
                }}
                disabled={props.disabled}
                inputRef={ref}
                autoComplete="off"
                fullWidth
                label=""
                placeholder={"Contraseña"}
                value={field.value ? field.value : ""}
                required
                size="small"
                shrink="true"
                type={showPass ? "text" : "password"}
                error={error?.message ? true : false}
                onChange={(e) => field.onChange(e.target.value)}
              />
              <InputGroup.Text className="login__input__icon__pass display__small">
                <i
                  onClick={handleShowPass}
                  className={showPass ? "bi bi-eye" : "bi bi-eye-slash"}
                ></i>
              </InputGroup.Text>
            </InputGroup>

            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </>
        )}
        rules={{ required: true }}
        variant="outlined"
        size="small"
        control={control}
        helperText={errorText ? errorText : props.helperText}
        error={!!errorText}
      />
    </>
  );
};
