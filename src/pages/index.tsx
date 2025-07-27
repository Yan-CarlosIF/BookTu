import {
  Box,
  Flex,
  Heading,
  Icon,
  InputGroup,
  InputLeftElement,
  Text,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";
import { LockKeyhole, User } from "lucide-react";

export default function Home() {
  return (
    <Flex direction="column" align="center" justify="center">
      <Heading as="h1" fontSize="6xl" my={110}>
        BookTu
      </Heading>
      <Box
        boxShadow="0px 5px 20px -8px rgba(0,0, 0, 0.3)"
        rounded="xl"
        borderColor="gray_500"
        borderWidth={1}
        p={30}
        w={560}
        h={387}
      >
        <Heading
          display="flex"
          gap={18}
          justifyContent="center"
          ml={-20}
          alignItems="center"
          as="header"
        >
          <Text fontSize="md">BookTu</Text>
          <Text fontSize={28} fontWeight="medium">
            Iniciar Sessão
          </Text>
        </Heading>
        <VStack gap={30} mt={30}>
          <InputGroup>
            <InputLeftElement h={50}>
              <Icon as={User} color="gray_600" fontSize={20} />
            </InputLeftElement>
            <Input
              h={50}
              placeholder="Login"
              errorBorderColor="failed"
              focusBorderColor="highlight_blue"
              borderColor="gray_500"
              bg="gray_300"
              color="gray_600"
              _placeholder={{ color: "gray_600", fontWeight: "medium" }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement h={50}>
              <Icon as={LockKeyhole} color="gray_600" fontSize={20} />
            </InputLeftElement>
            <Input
              h={50}
              placeholder="Senha"
              errorBorderColor="failed"
              focusBorderColor="highlight_blue"
              borderColor="gray_500"
              bg="gray_300"
              color="gray_600"
              _placeholder={{ color: "gray_600", fontWeight: "medium" }}
            />
          </InputGroup>
        </VStack>
        <Button
          mt={62}
          w="full"
          _hover={{ bg: "teal.300" }}
          bg="highlight_blue"
          color="background"
          fontSize="xl"
          h={58}
        >
          Iniciar Sessão
        </Button>
      </Box>
    </Flex>
  );
}
