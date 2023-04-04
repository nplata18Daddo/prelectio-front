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
