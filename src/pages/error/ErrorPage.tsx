import { Link, useRouteError } from "react-router-dom";

interface RouteError {
  status: number;
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center space-y-4">
      <h1 className="text-5xl">Oops!</h1>
      <p className="text-lg">Sorry, an unexpected error has occurred.</p>
      <p className="pt-8">
        <i>
          {error.status} | {error.statusText || error.message}
        </i>
      </p>
      <Link to="/" className="underline text-primary">
        Go back to Home
      </Link>
    </div>
  );
}
