import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/routes.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
