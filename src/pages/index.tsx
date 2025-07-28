import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { LockKeyhole, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/services/useLogin";
import { Input } from "@/components/input";
import { alreadyLoggedIn } from "@/utils/alreadyLoggedIn";

const loginSchema = z.object({
  login: z.string().nonempty("Login obrigatório"),
  password: z.string().nonempty("Informe sua senha"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Home() {
  const { mutateAsync: LoginFn } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginSchema) {
    await LoginFn(data);
  }

  return (
    <Flex direction="column" align="center" justify="center">
      <Heading color="gray_800" as="h1" fontSize="6xl" my={110}>
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
        <Flex direction="column" h="100%">
          <Heading
            display="flex"
            gap={18}
            justifyContent="center"
            ml={-20}
            alignItems="center"
            as="header"
          >
            <Text color="gray_800" fontSize="md">
              BookTu
            </Text>
            <Text color="gray_800" fontSize={28} fontWeight="medium">
              Iniciar Sessão
            </Text>
          </Heading>
          <Flex
            as="form"
            direction="column"
            onSubmit={handleSubmit(handleLogin)}
            mt="30px"
            gap="24px"
            h="100%"
          >
            <Input
              h={50}
              placeholder="Login"
              error={errors.login}
              icon={User}
              {...register("login")}
            />
            <Input
              h={50}
              placeholder="Senha"
              type="password"
              error={errors.password}
              icon={LockKeyhole}
              {...register("password")}
            />
            <Button
              rounded="lg"
              mt="auto"
              type="submit"
              isLoading={isSubmitting}
              w="full"
              _hover={{ bg: "teal.300" }}
              bg="highlight_blue"
              color="background"
              fontSize="xl"
              h="58px"
            >
              Iniciar Sessão
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export const getServerSideProps = alreadyLoggedIn(async (ctx) => {
  return {
    props: {},
  };
});
