import { useDisclosure } from "@chakra-ui/react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import { EditBookModal } from "../CheckboxTable/BookModal/edit";
import { CancelAlertDialog } from "./cancel-alert";

interface ActionBarProps {
  setSelectedData: (data: string[]) => void;
  data: string[];
  count: number;
  onClear: () => void;
  children?: ReactNode;
}

export function ActionBar({
  data,
  count,
  onClear,
  children,
  setSelectedData,
}: ActionBarProps) {
  const {
    isOpen: isCancelOpen,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (count === 0) {
    return null;
  }

  return (
    <Box
      position="fixed"
      bottom="7"
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
          {count === 1 && (
            <>
              <Button
                color="gray_800"
                variant="outline"
                size="sm"
                onClick={onOpen}
              >
                Editar
              </Button>
              <EditBookModal
                setSelectedData={setSelectedData}
                bookId={data[0]}
                isOpen={isOpen}
                onClose={onClose}
              />
            </>
          )}
          <Button colorScheme="red" size="sm" onClick={onOpenCancel}>
            Excluir
          </Button>
          <CancelAlertDialog
            data={data}
            onClear={onClear}
            isOpen={isCancelOpen}
            onClose={onCloseCancel}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
