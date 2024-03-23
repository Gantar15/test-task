import { BrowserRouter } from "./providers/RouterProvider";
import { ChakraUiProvider } from "./providers/ChakraUiProvider";
import { FullPageError } from "@/shared/ui/FullPageError/";
import { Loader } from "@/shared/ui/Loader";
import { withErrorBoundary } from "react-error-boundary";
import { withSuspense } from "@/shared/lib/react";

function Providers() {
  return (
    <ChakraUiProvider>
      <BrowserRouter />;
    </ChakraUiProvider>
  );
}

const SuspensedProvider = withSuspense(Providers, {
  fallback: <Loader size="full" />
});
const ErrorBoundaryProvider = withErrorBoundary(SuspensedProvider, {
  fallbackRender: ({ error }) => <FullPageError error={error} />
});

export default ErrorBoundaryProvider;
