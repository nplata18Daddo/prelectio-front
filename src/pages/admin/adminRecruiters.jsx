import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, Col, Container, Placeholder, Row } from "react-bootstrap";
import MUIDataTable from "mui-datatables";
import { CODES } from "../../consts/codes";
import {
  GetApprovedRecruiters,
  GetPendingRecruiters,
} from "../../services/adminServices";
import { Link } from "react-router-dom";
import { GetDocumentType } from "../../consts/generalFunctions";
export const AdminRecruiters = () => {
  const [value, setValue] = useState(0);
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loadingSkeleton = [
    {
      name: <Placeholder xs={12} />,
      email: <Placeholder xs={12} />,
      documentType: <Placeholder xs={12} />,
      documentNumber: <Placeholder xs={12} />,
      phone: <Placeholder xs={12} />,
      detail: <Placeholder xs={12} />,
    },
    {
      name: <Placeholder xs={12} />,
      email: <Placeholder xs={12} />,
      documentType: <Placeholder xs={12} />,
      documentNumber: <Placeholder xs={12} />,
      phone: <Placeholder xs={12} />,
      detail: <Placeholder xs={12} />,
    },
  ];

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const [pending, approved] = await Promise.all([
          GetPendingRecruiters(),
          GetApprovedRecruiters(),
        ]);
        setLoading(false);
        // setLoading(false);
        if (approved.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
          const ProcessRows = approved.data.responseMessage.map((item, idx) => {
            return {
              name: item.nombre_usuario,
              email: !item.email_usuario ? " - " : item.email_usuario,
              documentType: item.tipo_documento_usuario,
              documentNumber: !item.numero_documento_usuario
                ? " - "
                : item.numero_documento_usuario,
              phone: !item.telefono_usuario ? " - " : item.telefono_usuario,
              detail: (
                <Link to={`/admin/recruiter/${item.id_usuario}`}>
                  <Button className="state-colors__primary-color-one">
                    Ver detalle
                  </Button>
                </Link>
              ),
            };
          });
          setApproved(ProcessRows);
        }
        if (pending.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
          const ProcessRows = pending.data.responseMessage.map((item, idx) => {
            return {
              name: item.nombre_usuario,
              email: !item.email_usuario ? " - " : item.email_usuario,
              documentType: GetDocumentType(item.tipo_documento_usuario),
              documentNumber: !item.numero_documento_usuario
                ? " - "
                : item.numero_documento_usuario,
              phone: !item.telefono_usuario ? " - " : item.telefono_usuario,
              detail: (
                <Link to={`/admin/recruiter/${item.id_usuario}`}>
                  <Button className="state-colors__primary-color-one">
                    Ver detalle
                  </Button>
                </Link>
              ),
            };
          });
          setPending(ProcessRows);
        }
      };

      fetchData();
    } catch (error) {
      setLoading(false);
    }
  }, [refresh]);

  const columns = [
    { name: "name", label: "Nombre Completo" },
    { name: "email", label: "Correo" },
    {
      name: "documentType",
      label: "Tipo documento",
      options: {
        search: false,
      },
    },
    { name: "documentNumber", label: "Numero documento" },
    {
      name: "phone",
      label: "Celular",
      options: {
        filter: false,

        search: false,
      },
    },
    {
      name: "detail",
      label: "Detalle",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];

  const options = {
    selectableRows: "none",
    selectableRowsHeader: false,
    print: false,
    rowsPerPageOptions: [10, 15, 20],
    viewColumns: false,
    searchPlaceholder: "Buscar por nombre, correo y numero de documento",
    textLabels: {
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        filterTable: "Filtrar tabla",
      },
      body: {
        noMatch: "No se encuentran coincidencias.",
        toolTip: "Sort",

        columnHeaderTooltip: (column) => "Ordenar por " + column.label,
      },
      filter: {
        all: "Todos",
        title: "Filtros",
        reset: "Limpiar",
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por pagina",
        displayRows: "de",
      },
    },
  };
  return (
    <div>
      <Container style={{ marginTop: "8rem" }}>
        <Row>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                className="justify-content-center"
              >
                <Tab label="Pendientes" />
                <Tab label="Aprobados" />
              </Tabs>
            </Box>
          </Box>
          <Row className="justify-content-end">
            <Col xs={2} className="mt-5">
              <Button
                className="login__submit display__small weight__bold"
                onClick={() => {
                  setRefresh(!refresh);
                }}
              >
                Actualizar
              </Button>
            </Col>
          </Row>
          <Row>
            {value === 0 && (
              <div className="datatable__padding">
                <MUIDataTable
                  className="recruiters__datatable"
                  data={loading ? loadingSkeleton : pending}
                  columns={columns}
                  options={options}
                />
              </div>
            )}
            {value === 1 && (
              <div>
                <div className="datatable__padding">
                  <MUIDataTable
                    className="recruiters__datatable"
                    data={loading ? loadingSkeleton : approved}
                    columns={columns}
                    options={options}
                  />
                </div>
              </div>
            )}
          </Row>
        </Row>
      </Container>
    </div>
  );
};
