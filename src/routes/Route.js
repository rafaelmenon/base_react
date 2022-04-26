import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const RouteWrapper = ({ component, isProtected, ...rest }) => {
  const isSigned = useSelector((state) => state.auth.signed);

  if (isProtected && !isSigned) return <Redirect to="/login" />;

  if (!isProtected && isSigned) return <Redirect to="/" />;

  return <Route component={component} {...rest} />;
};

export default RouteWrapper;
