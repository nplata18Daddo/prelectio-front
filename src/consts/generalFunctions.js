export function GetDocumentType(data) {
  switch (data) {
    case "1":
      return "CC";
    case "2":
      return "CE";
    case "3":
      return "TI";
    default:
      return "CC";
  }
}

export function GetRepresents(data) {
  switch (data) {
    case "1":
      return "Club de fútbol";
    case "2":
      return "Agencia";
    case "3":
      return "Medios";
    case "4":
      return "Federación";
    case "5":
      return "Fanático de Fútbol";
    case "6":
      return "Otros";
    default:
      return "Otros";
  }
}
