import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ActionBarProps {
  count: number;
  onClear: () => void;
  onDelete: () => void;
  children?: ReactNode;
}

export function ActionBar({
  count,
  onClear,
  onDelete,
  children,
}: ActionBarProps) {
  if (count === 0) {
    return null;
  }

  return (
    <Box
      position="fixed"
      bottom="6"
      borderRadius="lg"
      left="58%"
      transform="translateX(-50%)"
      width="450px"
      bg="background"
      borderWidth="1px"
      borderColor="gray_500"
      boxShadow="md"
      zIndex="100"
    >
      <Flex
        px="6"
        py="4"
        align="center"
        justify="space-between"
        maxW="6xl"
        mx="auto"
      >
        <Box
          border="1px dashed"
          borderRadius="4px"
          p="2"
          borderColor="gray_500"
        >
          <Text color="gray_800" fontSize="sm" fontWeight="medium">
            {count} selecionado{count > 1 ? "s" : ""}
          </Text>
        </Box>
        <Flex gap="2">
          {children}
          <Button
            color="gray_800"
            variant="outline"
            size="sm"
            onClick={onClear}
          >
            Cancelar
          </Button>
          <Button
            color="gray_800"
            variant="outline"
            size="sm"
            onClick={onClear}
          >
            Editar
          </Button>
          <Button colorScheme="red" size="sm" onClick={onDelete}>
            Excluir
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
