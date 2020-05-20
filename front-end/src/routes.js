import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Index from "./components/pages/Index"


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="" component={Index} />
        {/* < Route exact path="" component={} /> */}
      </Switch>
    </BrowserRouter>
  )
}