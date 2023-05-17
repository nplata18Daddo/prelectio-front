import React from "react";
import { IconButton, TextField, Tooltip, useFormControl } from "@mui/material";
import {
  Controller,
  useFormContext,
  useController,
  get,
} from "react-hook-form";
import UploadIcon from "@mui/icons-material/Upload";
import emptyProfile from "../../../../assets/register/emptyProfile.png";
import { PhotoCamera } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { Col, Row } from "react-bootstrap";
import ExampleProfilePic from "../../../../assets/register/exampleProfilePic.png";

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
          <div className="imageInput mt-3">
            <h4 style={{ marginBottom: "2vh" }}>
              ¡Sube tu mejor foto!{" "}
              <Tooltip
                title={
                  <Row style={{ padding: "10px" }}>
                    <Col xs={12}>
                      <h5 className="display__regular">
                        Se recomienda subir una foto donde se vea tu rostro
                        completo. Un ejemplo de una buena foto de perfil es:
                      </h5>
                    </Col>
                    <Col xs={12} style={{ textAlign: "center" }}>
                      <img
                        src={ExampleProfilePic}
                        alt="Ejemplo foto perfil"
                      ></img>
                    </Col>
                  </Row>
                }
                placement="top"
              >
                <IconButton style={{ padding: 0, marginLeft: "10px" }}>
                  <InfoIcon
                    fontSize="large"
                    sx={{
                      color: "#00ccff",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </h4>

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
            {!props.allowImage && (
              <span style={{ color: "red", marginTop: "10px" }}>
                La imagen debe de pesar menos de Megas.
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
