import { CloseRounded } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Form,
  InputGroup,
  Col,
  Spinner,
  Button,
  FormLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AthleteCard } from "../../components/components/athlete/athleteCard";
import { CODES } from "../../consts/codes";
import {
  fetchAthlete,
  getAthlete,
  getAthleteStatus,
  resetAthleteStatus,
} from "../../parts/athleteSlice";
import { GetDeportistas } from "../../services/deportistaServices";

export const ListAthletes = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filteredAthletes, setFilteredAthletes] = useState([]);
  const [filteredLength, setFilteredLength] = useState(0);
  const [selectedGenero, setSelectedGenero] = useState(null);
  const [selectedPosicion, setSelectedPosicion] = useState(null);
  const [selectedPierna, setSelectedPierna] = useState(null);
  const [selectedAnio, setSelectedAnio] = useState(null);
  const [showedAthletes, setShowedAthletes] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);

  const dispatch = useDispatch();

  const athleteStatus = useSelector(getAthleteStatus);
  const athleteList = useSelector(getAthlete);

  const posiciones = CODES.CODES_POSICIONES;
  const handleGeneroChange = (event) => {
    setSelectedGenero(event.target.value);
  };
  const handlePosicionChange = (event) => {
    setSelectedPosicion(event.target.value);
  };
  const handlePiernaChange = (event) => {
    setSelectedPierna(event.target.value);
  };
  const handleAnioChange = (event) => {
    setSelectedAnio(event);
  };

  useEffect(() => {
    let filteredAthletes = athleteList.filter((item) => {
      if (selectedGenero !== null) {
        if (selectedGenero !== item.usuario.genero_usuario) {
          return false;
        }
      }
      if (selectedPosicion !== null) {
        if (selectedPosicion != item.posicion_deportista) {
          return false;
        }
      }
      if (selectedPierna !== null) {
        if (selectedPierna != item.pierna_habil_deportista) {
          return false;
        }
      }
      if (selectedAnio !== null) {
        if (
          !moment(selectedAnio).isSame(
            item.usuario.fecha_nacimiento_usuario,
            "year"
          )
        ) {
          return false;
        }
      }
      return true;
    });
    if (Math.ceil(filteredLength / showedAthletes) <= selectedPage - 1) {
      setSelectedPage(1);
    }
    setFilteredLength(filteredAthletes.length);
    filteredAthletes = filteredAthletes.splice(
      showedAthletes * (selectedPage - 1),
      showedAthletes
    );
    setFilteredAthletes(filteredAthletes);
  }, [
    selectedGenero,
    selectedPosicion,
    selectedPierna,
    selectedAnio,
    showedAthletes,
    selectedPage,
  ]);

  useEffect(() => {
    if (athleteList.length === 0) {
      setLoading(true);
    }

    const requestAthletes = async () => {
      try {
        dispatch(fetchAthlete()).then((item) => {
          setFilteredLength(item.payload.length);
          let filteredAthletes = JSON.parse(
            JSON.stringify(item.payload)
          ).splice(showedAthletes * (selectedPage - 1), showedAthletes);
          setFilteredAthletes(filteredAthletes);
        });
      } catch (error) {
        console.log("==============Error Get athletes======================");
        console.log(error);
        console.log("====================================");
      }
    };
    requestAthletes();
    setLoading(false);
  }, [dispatch, refresh]);

  const handleSearch = (event) => {
    setSelectedGenero(null);
    setSelectedPosicion(null);
    setSelectedPierna(null);
    const value = event.target.value.toLowerCase();
    let filteredAthletes = athleteList.filter((item) => {
      return item.usuario.nombre_usuario.toLowerCase().includes(value);
    });
    setFilteredAthletes(filteredAthletes);
  };

  return (
    <div className="listAthletes">
      <Container style={{ marginTop: "3rem", marginBottom: "5rem" }}>
        <div className="listAthletes__container">
          <Row
            style={{ margin: "0" }}
            className="listAthletes__searchBarWrapper"
          >
            <Col xs={8} md={10}>
              <InputGroup>
                <InputGroup.Text className="display__small">
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  className="display__label"
                  disabled={athleteList.length === 0}
                  type="search"
                  placeholder="Buscar por nombre"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </InputGroup>
            </Col>
            <Col
              xs={4}
              md={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                className="listAthletes__button"
                onClick={() => {
                  dispatch(resetAthleteStatus());
                  setRefresh(!refresh);
                  setSelectedGenero(null);
                  setSelectedPosicion(null);
                  setSelectedPierna(null);
                  setSelectedAnio(null);
                }}
              >
                Actualizar
              </Button>
            </Col>
          </Row>
          <Row className="listAthletes__filterWrapper">
            <Col
              xs={12}
              sm={6}
              lg={3}
              className="listAthletes__filterWrapper__col"
            >
              <FormControl fullWidth>
                <InputGroup className="no__wrap">
                  <FormLabel className="display__label">Género</FormLabel>
                  <Select
                    disabled={athleteList.length === 0}
                    style={{ width: selectedGenero ? "88%" : "100%" }}
                    value={selectedGenero ? selectedGenero : ""}
                    onChange={handleGeneroChange}
                    displayEmpty
                  >
                    <MenuItem disabled value="">
                      Género
                    </MenuItem>
                    <MenuItem value={1}>Masculino</MenuItem>
                    <MenuItem value={2}>Femenino</MenuItem>
                  </Select>
                  {selectedGenero && (
                    <InputGroup.Text
                      style={{ width: "12%" }}
                      className="display__small"
                      onClick={() => setSelectedGenero(null)}
                    >
                      <i className="bi bi-x"></i>
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </FormControl>
            </Col>
            <Col
              xs={12}
              sm={6}
              lg={3}
              className="listAthletes__filterWrapper__col"
            >
              <FormControl fullWidth>
                <InputGroup className="no__wrap">
                  <FormLabel className="display__label">Posición</FormLabel>
                  <Select
                    disabled={athleteList.length === 0}
                    style={{ width: selectedPosicion ? "88%" : "100%" }}
                    displayEmpty
                    value={selectedPosicion ? selectedPosicion : ""}
                    onChange={handlePosicionChange}
                  >
                    <MenuItem disabled value="">
                      Posición
                    </MenuItem>
                    {posiciones.map((item, index) => {
                      return (
                        <MenuItem value={item.value} key={index}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {selectedPosicion && (
                    <InputGroup.Text
                      style={{ width: "12%" }}
                      className="display__small"
                      onClick={() => setSelectedPosicion(null)}
                    >
                      <i className="bi bi-x"></i>
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </FormControl>
            </Col>
            <Col
              xs={12}
              sm={6}
              lg={3}
              className="listAthletes__filterWrapper__col"
            >
              <FormControl className="no__wrap" fullWidth>
                <InputGroup className="no__wrap">
                  <FormLabel className="display__label">Pierna Hábil</FormLabel>
                  <Select
                    disabled={athleteList.length === 0}
                    style={{ width: selectedPierna ? "88%" : "100%" }}
                    displayEmpty
                    value={selectedPierna ? selectedPierna : ""}
                    onChange={handlePiernaChange}
                  >
                    <MenuItem disabled value="">
                      Pierna Hábil
                    </MenuItem>
                    <MenuItem value={1}>Derecha</MenuItem>
                    <MenuItem value={2}>Izquierda</MenuItem>
                  </Select>
                  {selectedPierna && (
                    <InputGroup.Text
                      style={{ width: "12%" }}
                      className="display__small"
                      onClick={() => setSelectedPierna(null)}
                    >
                      <i className="bi bi-x"></i>
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </FormControl>
            </Col>
            <Col
              xs={12}
              sm={6}
              lg={3}
              className="listAthletes__filterWrapper__col"
            >
              <FormControl fullWidth>
                <InputGroup className="no__wrap">
                  <FormLabel className="display__label">
                    Año de nacimiento
                  </FormLabel>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                      disabled={athleteList.length === 0}
                      sx={{
                        width: "88%",
                      }}
                      autoComplete="off"
                      label=""
                      placeholder="Año de nacimiento"
                      value={selectedAnio ? moment(selectedAnio) : null}
                      onChange={(e) => {
                        handleAnioChange(e.format("YYYY"));
                      }}
                      views={["year"]}
                    />
                  </LocalizationProvider>
                  {selectedAnio && (
                    <InputGroup.Text
                      style={{ width: "12%" }}
                      className="display__small"
                      onClick={() => setSelectedAnio(null)}
                    >
                      <i className="bi bi-x"></i>
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </FormControl>
            </Col>
          </Row>
          <Row className="listAthletes__paginationWrapper">
            <Col
              xl={{ offset: 9, span: 3 }}
              sm={{ offset: 7, span: 5 }}
              xs={{ offset: 6, span: 6 }}
            >
              <Row style={{ margin: "0" }}>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "Center",
                  }}
                  xs={6}
                  md={8}
                >
                  <h5 style={{ textAlign: "center" }}>
                    Deportistas Por Página
                  </h5>
                </Col>
                <Col xs={6} md={4}>
                  <Select
                    fullWidth
                    value={showedAthletes}
                    onChange={(e) => {
                      setShowedAthletes(e.target.value);
                    }}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                  </Select>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="listAthletes__listWrapper">
            {athleteList.length === 0 ? (
              <div
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Spinner variant="primary" />
              </div>
            ) : (
              filteredAthletes.map((item, index) => {
                return (
                  <Col
                    xs={12}
                    sm={6}
                    md={6}
                    lg={3}
                    key={index}
                    className="listAthletes__cardCol"
                  >
                    <AthleteCard item={item} key={index} />
                  </Col>
                );
              })
            )}
          </Row>
          <Row>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "Center",
              }}
            >
              <Pagination
                count={Math.ceil(filteredLength / showedAthletes)}
                size={"large"}
                page={selectedPage}
                defaultPage={1}
                onChange={(e, f, g) => {
                  setSelectedPage(f);
                }}
              />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
