import React from "react";
import { IconButton, TextField, useFormControl } from "@mui/material";
import {
  Controller,
  useFormContext,
  useController,
  get,
} from "react-hook-form";
import UploadIcon from "@mui/icons-material/Upload";
import emptyProfile from "../../../../assets/register/emptyProfile.png";
import { PhotoCamera } from "@mui/icons-material";
export const ImageInput = ({ ...props }) => {
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
          //   <TextField
          //     inputRef={ref}
          //     autoComplete="off"
          //     fullWidth
          //     multiline
          //     rows={props.rows}
          //     label={props.label}
          //     value={field.value ? field.value : ""}
          //     required
          //     size="small"
          //     shrink="true"
          //     error={error?.message ? true : false}
          //     onChange={(e) => field.onChange(e.target.value)}
          //   />
          <div className="imageInput">
            <h4 style={{ marginBottom: "2vh" }}>¡Sube tu mejor foto!</h4>
            <div className="imageInput__fotoDiv">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {props.imagePreviewUrl ? (
                  <>
                    <img
                      className="imageInput__fotoDiv__profilePic"
                      src={props.imagePreviewUrl}
                      alt="preview"
                    />
                  </>
                ) : (
                  <>
                    <img
                      className="imageInput__fotoDiv__profilePic"
                      src={emptyProfile}
                      alt="preview"
                    />
                  </>
                )}
              </div>
              <div className="imageInput__fotoDiv__iconButton">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    id="photo-upload"
                    className="imageInput__fotoDiv__fileUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      props.handleImageChange(e);
                      field.onChange(e.target.value);
                    }}
                  ></input>
                  <UploadIcon
                    fontSize="large"
                    style={{
                      width: "40px",
                      height: "40px",
                      padding: "15%",
                    }}
                    sx={{
                      backgroundColor: "#00ccff",
                      color: "white",
                      borderRadius: "50%",
                    }}
                  />
                </IconButton>
              </div>
            </div>
            {error && (
              <span style={{ color: "red", marginTop: "10px" }}>
                {" "}
                {error.message}
              </span>
            )}
          </div>
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
