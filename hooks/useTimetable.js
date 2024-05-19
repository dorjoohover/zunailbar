import { useContext } from "react";

import { TimetableContext } from "../contexts/TimetableContext";

const useTimetable = () => {
  const context = useContext(TimetableContext);

  if (!context)
    throw new Error("CompanyContext must be placed within CompanyProvider.");
  return context;
};

export default useTimetable;
