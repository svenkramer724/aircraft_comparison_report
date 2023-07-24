import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import SingleAircraftDetails from "./views/SingleAircraft/SingleAircraftDetails";
import CompareAircrafts from "./views/compareAircrafts/CompareAircrafts";
import Subscription from "./views/Subscription/Subscription";
import NotFound from "./views/NotFound/NotFound";
import NotAuthorized from "./views/NotAuthorized";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/:aircraft_name/", element: <SingleAircraftDetails /> },
  { path: "/compare/", element: <CompareAircrafts /> },
  { path: "/check", element: <Subscription /> },
  { path: "/not-found", element: <NotFound /> },
  { path: "/not-authorized", element: <NotAuthorized /> },
]);
root.render(<RouterProvider router={router} />);
