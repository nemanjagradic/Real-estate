import { Box, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as {
    status: number;
    message: string;
    data: string;
  };

  let title = "An error occured.";
  let message = "Something went wrong.";

  if (error.status === 500) {
    message = error.data || "Internal server error!";
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <Box pt="10" m="auto" textAlign="center">
      <Text fontSize={24} fontWeight="bold" textTransform="uppercase">
        {title}
      </Text>
      <Text fontSize={18} fontWeight="medium" color="gray.500">
        {message}
      </Text>
    </Box>
  );
}

export default ErrorPage;
