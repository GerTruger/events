import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { EventPage, jsonData as eventPageLoader } from "./pages/EventPage";
import { EventsPage, jsonData as eventsPageLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import {
  AddEvent,
  jsonData as addEventLoader,
  action as addEvent,
} from "./pages/AddEvent";
import { EditEvent, jsonData as editEventLoader } from "./pages/EditEvent";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsPageLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventPageLoader,
      },
      {
        path: "/event/addevent",
        element: <AddEvent />,
        loader: addEventLoader,
        action: addEvent,
      },
      {
        path: "editevent/:eventId",
        element: <EditEvent />,
        loader: editEventLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
