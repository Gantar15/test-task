import { Text, VStack } from "@chakra-ui/react";

import { Outlet } from "react-router-dom";

export function BaseLayout() {
  return (
    <VStack spacing={35} p={10}>
      <Text fontSize={"22px"} fontWeight={"bold"}>
        Test Task
      </Text>
      <Outlet />
    </VStack>
  );
}
