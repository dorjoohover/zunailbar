import { useContext } from "react";

import { EmployeeContext } from "../contexts/EmployeeContext";

const EmployeeAuth = () => {
  const context = useContext(EmployeeContext);

  if (!context)
    throw new Error("AuthContext must be placed within AuthProvider.");

  return context;
};

export default EmployeeAuth;
