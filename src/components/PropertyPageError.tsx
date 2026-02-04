import { Box, Button, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

const PageError = ({ title, description, actionLabel, onAction }: Props) => (
  <Box mt="120px" textAlign="center" height="100vh">
    <Text fontSize="xl" fontWeight="bold">
      {title}
    </Text>
    <Text color="gray.500">{description}</Text>
    {onAction && (
      <Button mt={4} onClick={onAction}>
        {actionLabel ?? "Refresh"}
      </Button>
    )}
  </Box>
);

export default PageError;
