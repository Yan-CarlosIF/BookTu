import {
  Button,
  Flex,
  HStack,
  Skeleton,
  Td,
  Text,
  Th,
  Tr,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { BaseTable } from "..";

const tableHeaders = () => (
  <>
    <Th>Livro</Th>
    <Th>Estabelecimento</Th>
    <Th>Preço</Th>
    <Th isNumeric>Quantidade</Th>
  </>
);

export function LoadingStocks() {
  return (
    <>
      <BaseTable h="575px" headers={tableHeaders()}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Tr key={index}>
            <Td
              w="40%"
              maxH="53px"
              h="53px"
              py="0px"
              borderRight="1px"
              borderRightColor="gray.200"
            >
              <Skeleton borderRadius="lg" h="20px" w="200px" noOfLines={1} />
            </Td>
            <Td
              w="30%"
              maxH="53px"
              h="53px"
              py="0px"
              borderRight="1px"
              borderRightColor="gray.200"
            >
              <Skeleton borderRadius="lg" h="20px" w="200px" noOfLines={1} />
            </Td>
            <Td
              maxH="53px"
              h="53px"
              py="0px"
              borderRight="1px"
              borderRightColor="gray.200"
            >
              <Skeleton borderRadius="lg" h="20px" w="100px" noOfLines={1} />
            </Td>
            <Td
              display="flex"
              justifyContent="end"
              isNumeric
              maxH="53px"
              h="53px"
              borderRight="1px"
              borderRightColor="gray.200"
            >
              <Skeleton borderRadius="lg" h="20px" w="100px" noOfLines={1} />
            </Td>
          </Tr>
        ))}
      </BaseTable>
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
