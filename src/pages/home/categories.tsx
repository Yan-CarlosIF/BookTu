import { HomeLayout } from "@/components/Home/layout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { withAuthServerSideProps } from "@/utils/withAuth";
import { Flex, Select } from "@chakra-ui/react";
import { Input } from "@/components/input";
import { useRouter } from "next/router";
import { Search } from "lucide-react";
import { UseListCategories } from "@/services/Categories/useListCategories";
import { SimpleTable } from "@/components/SimpleTable";
import { SimpleTableLoading } from "@/components/SimpleTable/loading";

export type CategoriesPageProps = {
  name: string;
  page: number;
  sort?: string | null;
};

const CategoriesPage: NextPageWithLayout<CategoriesPageProps> = ({
  page,
  sort,
}) => {
  const { data, isLoading } = UseListCategories(page, sort);

  const router = useRouter();

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
          placeholder="Procurar por nome da categoria"
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
        </Select>
      </Flex>

      {isLoading ? <SimpleTableLoading /> : <SimpleTable data={data} />}
    </>
  );
};

CategoriesPage.getLayout = function getLayout(
  page: ReactElement,
  pageProps: CategoriesPageProps
) {
  return (
    <HomeLayout slug="categories" name={pageProps.name}>
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

export default CategoriesPage;
