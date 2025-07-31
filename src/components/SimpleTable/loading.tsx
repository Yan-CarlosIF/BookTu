import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  HStack,
  Skeleton,
} from "@chakra-ui/react";
import {
  ChevronLeft,
  ChevronRight,
  EditIcon,
  Plus,
  Trash2,
} from "lucide-react";

export function SimpleTableLoading() {
  return (
    <>
      <TableContainer mt="40px">
        <Table h="612px" borderWidth={1} borderColor="gray.200">
          <Thead bg="gray_300">
            <Tr>
              <Th>Nome</Th>
              <Th>Editar</Th>
              <Th>Deletar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <Tr key={index}>
                <Th w="66%">
                  <Skeleton h="16px" w="35%" borderRadius="4px" />
                </Th>
                <Th>
                  <Button
                    isLoading
                    rightIcon={<EditIcon size={16} />}
                    size="sm"
                    colorScheme="teal"
                  >
                    Editar
                  </Button>
                </Th>
                <Th>
                  <Button
                    isLoading
                    rightIcon={<Trash2 size={16} />}
                    size="sm"
                    colorScheme="red"
                  >
                    Deletar
                  </Button>
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex px="40px" mt="40px" align="center" justify="space-between">
        <Text
          gap="10px"
          display="flex"
          alignItems="center"
          color="gray_800"
          fontWeight="medium"
        >
          Página <Skeleton w="20px" h="16px" borderRadius="4px" /> de{" "}
          <Skeleton w="20px" h="16px" borderRadius="4px" />
        </Text>

        <Button
          rightIcon={<Plus />}
          color="background"
          _focus={{ bg: "teal.400" }}
          _hover={{ bg: "teal.400" }}
          fontWeight="medium"
          bg="highlight_blue"
          px="80px"
          py="24px"
          isLoading
          disabled
        />

        <HStack spacing="2">
          <Button
            size="sm"
            variant="ghost"
            p="0px"
            disabled
            _focus={{ bg: "teal.400" }}
            _hover={{ bg: "teal.400" }}
          >
            <ChevronLeft />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            p="0px"
            isLoading
            disabled
            _focus={{ bg: "teal.400" }}
            _hover={{ bg: "teal.400" }}
          />
          <Button
            size="sm"
            variant="ghost"
            p="0px"
            isLoading
            disabled
            _focus={{ bg: "teal.400" }}
            _hover={{ bg: "teal.400" }}
          />
          <Button
            size="sm"
            variant="ghost"
            p="0px"
            isLoading
            disabled
            _focus={{ bg: "teal.400" }}
            _hover={{ bg: "teal.400" }}
          />
          <Button
            size="sm"
            variant="ghost"
            p="0px"
            disabled
            _focus={{ bg: "teal.400" }}
            _hover={{ bg: "teal.400" }}
          >
            <ChevronRight />
          </Button>
        </HStack>
      </Flex>
    </>
  );
}
