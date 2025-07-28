import { HomeLayout } from "@/components/Home/layout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { withAuthServerSideProps } from "@/utils/withAuth";
import { Flex, Select, Text } from "@chakra-ui/react";
import { Input } from "@/components/input";
import { Search } from "lucide-react";
import { UseBooks } from "@/services/useBooks";
import { CheckBoxTable } from "@/components/CheckboxTable";
import { mockBooks } from "@/shared/constants/books";

type BooksPageProps = {
  name: string;
};

const BooksPage: NextPageWithLayout<BooksPageProps> = () => {
  const { data, isFetching } = UseBooks(1, null);

  return (
    <>
      <Flex
        boxShadow="lg"
        mt="36px"
        align="center"
        bg="gray_300"
        borderRadius="lg"
        px="24px"
        py="18px"
        gap="160px"
      >
        <Input
          h="42px"
          bg="background"
          placeholder="Procurar por nome do livro"
          icon={Search}
        />
        <Select
          mr="20px"
          focusBorderColor="teal.300"
          placeholder="Filtros"
          bg="highlight_blue"
          color="background"
          fontWeight="medium"
          h="42px"
          w="125px"
          _hover={{ bg: "teal.400" }}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="newest">Mais recentes</option>
          <option value="oldest">Mais antigos</option>
        </Select>
      </Flex>

      {/* Tabela */}
      {isFetching ? (
        <Text>Carregando...</Text>
      ) : (
        <CheckBoxTable
          data={{
            ...data,
            data: mockBooks,
          }}
        />
      )}
    </>
  );
};

BooksPage.getLayout = function getLayout(
  page: ReactElement,
  pageProps: BooksPageProps
) {
  return (
    <HomeLayout slug="books" name={pageProps.name}>
      {page}
    </HomeLayout>
  );
};

export const getServerSideProps = withAuthServerSideProps(async (ctx, user) => {
  return {
    props: {
      name: user.name,
    },
  };
});

export default BooksPage;
