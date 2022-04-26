import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import Login from "@/pages/login";
import Home from "@/pages/home";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Home} isProtected />
    </Switch>
  );
};

export default Routes;
