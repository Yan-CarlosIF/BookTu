import { Flex, Text, Th } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { HomeLayout } from "@/components/Home/layout";
import { Pagination } from "@/components/Pagination/pagination";
import { SearchBar } from "@/components/search-bar";
import { BaseTable } from "@/components/Table";
import { LoadingStocks } from "@/components/Table/LoadingState/loading-stocks";
import { useDebounce } from "@/hooks/useDebounce";
import { NextPageWithLayout } from "@/pages/_app";
import { useListAllEstablishments } from "@/services/Establishments/useListAllEstablishments";
import { useListStocksItems } from "@/services/Stocks/useListStocksItems";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { StocksTableItem } from "../../components/pages/stocks/stocks-table-item";

interface StocksPageProps {
  page: number;
  sort: string | null;
}

const tableHeaders = () => (
  <>
    <Th>Livro</Th>
    <Th>Estabelecimento</Th>
    <Th>Preço</Th>
    <Th isNumeric>Quantidade</Th>
  </>
);

const StocksPage: NextPageWithLayout<StocksPageProps> = ({ page, sort }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { data: establishments } = useListAllEstablishments();
  const { data: items, isLoading } = useListStocksItems(
    page,
    sort,
    debouncedSearch
  );

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
      <SearchBar
        searchValue={search}
        onSearch={setSearch}
        placeholder="Buscar pelo título do livro"
        onFilter={handleFilterChange}
        filterOptions={establishments?.map((e) => ({
          value: e.id,
          label: e.name,
        }))}
      />

      {isLoading ? (
        <LoadingStocks />
      ) : (
        <>
          <BaseTable h="575px" headers={tableHeaders()}>
            {items.data.map((item) => (
              <StocksTableItem key={item.id} stockItem={item} />
            ))}
          </BaseTable>
          <Flex px="40px" mt="40px" align="center" justify="space-between">
            <Text color="gray_800" fontWeight="medium">
              Página {page} de {items?.lastPage}
            </Text>

            <Pagination
              w="fit-content"
              currentPage={page}
              lastPage={items?.lastPage}
            />
          </Flex>
        </>
      )}
    </>
  );
};

StocksPage.getLayout = function getLayout(page) {
  return <HomeLayout slug="Estoques">{page}</HomeLayout>;
};

export const getServerSideProps = withAuthServerSideProps(async (ctx) => {
  const { page, sort } = ctx.query;

  return {
    props: {
      page: page ? Number(page) : 1,
      sort: sort ?? null,
    },
  };
});

export default StocksPage;
