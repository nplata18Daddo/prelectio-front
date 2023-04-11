export const CODES = {
  //Response app success_codes
  COD_RESPONSE_SUCCESS: 200,
  COD_RESPONSE_SUCCESS_REQUEST: 0,
  COD_RESPONSE_ERROR: 1,

  //Status ID
  COD_ACTIVE_STATUS: 200,

  //Response app error codes
  COD_RESPONSE_ERROR_CREATE: 1001,
  COD_RESPONSE_ERROR_UPDATE: 1002,
  COD_RESPONSE_ERROR_DELETE: 1003,
  COD_RESPONSE_ERROR_LIST: 1004,
  COD_RESPONSE_ERROR_LOGIN: 1005,
  COD_RESPONSE_ERROR_UNAUTHORIZED: 1006,
  COD_RESPONSE_ERROR_SHOW: 1007,
  COD_INVALID_FILE: 1008,
  COD_RESPONSE_ERROR_RESET_PASSWORD: 1009,
  COD_RESPONSE_ERROR_VALIDATE: 1010,
  COD_RESPONSE_ERROR_UPLOAD_FILE: 1011,
  COD_RESPONSE_ERROR_GENERATE_FILE: 1012,
  COD_RESPONSE_ERROR_SEND_EMAIL: 1013,
  COD_RESPONSE_LOGIN_FIRST_TIME: 1014,

  //HTTP Response codes
  COD_RESPONSE_HTTP_OK: 200,
  COD_RESPONSE_HTTP_CREATED: 201,
  COD_RESPONSE_HTTP_BAD_REQUEST: 400,
  COD_RESPONSE_HTTP_UNAUTHORIZED: 401,
  COD_RESPONSE_HTTP_FORBIDDEN: 403,
  COD_RESPONSE_HTTP_NOT_FOUND: 404,
  COD_RESPONSE_HTTP_ERROR: 500,

  //DB codes
  COD_ROLES_ADMIN: "0",
  COD_ROLES_RECRUITER: "1",
  COD_ROLES_ATHLETE: "2",

  CODES_POSICIONES: [
    { label: "Portero", value: 1 },
    { label: "Lateral Derecho", value: 2 },
    { label: "Central Derecho", value: 3 },
    { label: "Central Izquierdo", value: 4 },
    { label: "Lateral Izquierdo", value: 5 },
    { label: "Volante de Marca", value: 6 },
    { label: "Volante Mixto", value: 7 },
    { label: "Volante Ofensivo", value: 8 },
    { label: "Extremo Derecho", value: 9 },
    { label: "Extremo Izquierdo", value: 10 },
    { label: "Delantero Centro", value: 11 },
  ],

  CODES_HABILIDADES: [
    { label: "Agilidad", value: 1 },
    { label: "Agresividad", value: 2 },
    { label: "Altura", value: 3 },
    { label: "Ambidiestro", value: 4 },
    { label: "Cabeceador", value: 5 },
    { label: "Capacidad de Reaccion", value: 6 },
    { label: "Creador de Jugadas", value: 7 },
    { label: "Estructura Física", value: 8 },
    { label: "Fuerza de Tiro", value: 9 },
    { label: "Habilidad Tecnica", value: 10 },
    { label: "Jugador Solido", value: 11 },
    { label: "Lider", value: 12 },
    { label: "Penales", value: 13 },
    { label: "Perfil Cambiado", value: 14 },
    { label: "Provocador", value: 15 },
    { label: "Rapido", value: 16 },
    { label: "Recuperador", value: 17 },
    { label: "Regateador", value: 18 },
    { label: "Saque Largo", value: 19 },
    { label: "Saque Largo Con Manos", value: 20 },
    { label: "Tiros Libres", value: 21 },
  ],

  PIERNA_HABIL_CODES: [
    { label: "Derecha", value: 1 },
    { label: "Izquierda", value: 2 },
  ],
  PIERNA_HABIL_ADJETIVO_CODES: [
    { label: "Diestro", value: 1 },
    { label: "Zurdo", value: 2 },
  ],
};
