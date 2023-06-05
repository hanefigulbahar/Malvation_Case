import { useRouteError } from "react-router-dom";
import { ErrorDetail } from "../types/error";
import Error from "../components/Error";
import { useEffect } from "react";
import { themeChanger } from "../utils/themaChanger";

export default function ErrorPage(): JSX.Element {
  const error = useRouteError() as ErrorDetail;
  const errorStatus = error.status;
  useEffect(() => {
    themeChanger();
  }, []);

  return (
    <div>
      <Error status={errorStatus} />
    </div>
  );
}
