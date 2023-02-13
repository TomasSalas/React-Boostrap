import React from "react"
import { BrowserRouter , Routes , Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { createRoot } from "react-dom/client";

import App from "./App"
import ViewEmployees from "./Views/Employees/ViewEmployees"
import CreateEmployees from "./Views/Employees/CreateEmployees"
import ViewTicket from "./Views/Ticket/ViewTicket"
import CreateTicket from "./Views/Ticket/CreateTicket"
import Index from "./Views/Index"

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='*' element={<Index />} />
      <Route path="/index" element={<Index />} />
      <Route path="/login" element={<App />} />
      <Route path="/viewEmployees" element={<ViewEmployees />} />
      <Route path="/createEmployees" element={<CreateEmployees />} />
      <Route path="/viewTicket" element={<ViewTicket />} />
      <Route path="/createTicket" element={<CreateTicket />} />
    </Routes>
  </BrowserRouter>
);