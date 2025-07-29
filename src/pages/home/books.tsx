import { HomeLayout } from "@/components/Home/layout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { withAuthServerSideProps } from "@/utils/withAuth";
import { Flex, Select } from "@chakra-ui/react";
import { Input } from "@/components/input";
import { Search } from "lucide-react";
import { UseBooks } from "@/services/useBooks";
import { CheckBoxTable } from "@/components/CheckboxTable";
import { CheckboxTableLoading } from "@/components/CheckboxTable/loading";
import { useRouter } from "next/router";

type BooksPageProps = {
  name: string;
  page: number;
  sort?: string;
};

const BooksPage: NextPageWithLayout<BooksPageProps> = ({ page, sort }) => {
  const router = useRouter();
  const { data, isLoading } = UseBooks(page, sort);

  function handleFilterChange(sort: string) {
    if (sort === "") {
      return router.push(`?page=${page}`);
    }

    router.push({
      query: {
        page,
        sort,
      },
    });
  }

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
          w="210px"
          _hover={{ bg: "teal.400" }}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="latest">Mais recentes</option>
          <option value="oldest">Mais antigos</option>
        </Select>
      </Flex>

      {/* Tabela */}
      {isLoading ? (
        <CheckboxTableLoading />
      ) : (
        <CheckBoxTable
          data={{
            ...data,
            data: data.books,
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
  const { page, sort } = ctx.query;

  return {
    props: {
      name: user.name,
      page: page ? Number(page) : 1,
      sort: sort ?? null,
    },
  };
});

export default BooksPage;
