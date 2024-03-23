import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const ChakraUiProvider = ({ children }: PropsWithChildren) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
