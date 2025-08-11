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
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { BaseTable } from "..";

const tableHeaders = () => (
  <>
    <Th>Nome</Th>
    <Th>CNPJ</Th>
    <Th>Endereço</Th>
  </>
);
export function LoadingEstablishments() {
  return (
    <>
      <BaseTable h="612px" headers={tableHeaders()}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Tr key={index}>
            <Td
              maxH="57px"
              h="57px"
              py="0px"
              borderRight="1px"
              borderRightColor="gray.200"
            >
              <Skeleton borderRadius="lg" h="20px" w="200px" noOfLines={1} />
            </Td>
            <Td
              maxH="57px"
              h="57px"
              py="0px"
              borderRight="1px"
              borderRightColor="gray.200"
            >
              <Skeleton borderRadius="lg" h="20px" w="200px" noOfLines={1} />
            </Td>
            <Td
              maxH="57px"
              h="57px"
              py="0px"
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
