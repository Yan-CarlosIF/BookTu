import {
  Button,
  Checkbox,
  Flex,
  HStack,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export function CheckboxTableBooksLoading() {
  return (
    <>
      <TableContainer mt="40px">
        <Table borderWidth={1} borderColor="gray.200" colorScheme="gray">
          <Thead bg="gray_300">
            <Tr>
              <Th>
                <Checkbox disabled colorScheme="teal" />
              </Th>
              <Th>Título</Th>
              <Th>Identificador</Th>
              <Th>Categoria(s)</Th>
              <Th>Ano de Lançamento</Th>
              <Th isNumeric>Preço (R$)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <Tr key={index} maxH="40px">
                <Td w="fit-content">
                  <Checkbox disabled colorScheme="teal" />
                </Td>
                <Td
                  w="30%"
                  maxH="40px"
                  h="40px"
                  p="0px"
                  borderRight="1px"
                  borderRightColor="gray.200"
                >
                  <Skeleton
                    borderRadius="lg"
                    h="20px"
                    w="100px"
                    noOfLines={1}
                  />
                </Td>
                <Td w="20%" borderRight="1px" borderRightColor="gray.200">
                  <Skeleton
                    borderRadius="lg"
                    h="20px"
                    w="100px"
                    noOfLines={1}
                  />
                </Td>
                <Td borderRight="1px" borderRightColor="gray.200">
                  <Skeleton
                    borderRadius="lg"
                    h="20px"
                    w="100px"
                    noOfLines={1}
                  />
                </Td>
                <Td borderRight="1px" borderRightColor="gray.200">
                  <Skeleton
                    borderRadius="lg"
                    h="20px"
                    w="100px"
                    noOfLines={1}
                  />
                </Td>
                <Td display="flex" justifyContent="end" isNumeric>
                  <Skeleton
                    borderRadius="lg"
                    h="20px"
                    w="100px"
                    noOfLines={1}
                  />
                </Td>
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
          Página <Skeleton as="strong" w="20px" h="16px" borderRadius="4px" />{" "}
          de <Skeleton as="strong" w="20px" h="16px" borderRadius="4px" />
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
