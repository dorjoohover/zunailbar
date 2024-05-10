import { useContext } from "react";

import { ReportContext } from "../contexts/ReportContext.js";

const useReport = () => {
  const context = useContext(ReportContext);

  if (!context)
    throw new Error("ReportContext must be placed within CompanyProvider.");
  return context;
};

export default useReport;
