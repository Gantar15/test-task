import { BrowserRouter } from "./providers/RouterProvider";
import { FullPageError } from "@/shared/ui/FullPageError/";
import { Loader } from "@/shared/ui/Loader";
import { withErrorBoundary } from "react-error-boundary";
import { withSuspense } from "@/shared/lib/react";

function Providers() {
  return <BrowserRouter />;
}

const SuspensedProvider = withSuspense(Providers, {
  fallback: <Loader size="full" />,
});
const ErrorBoundaryProvider = withErrorBoundary(SuspensedProvider, {
  fallbackRender: ({ error }) => <FullPageError error={error} />,
});

export default ErrorBoundaryProvider;
