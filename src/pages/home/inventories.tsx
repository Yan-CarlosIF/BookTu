import { Flex, Text, Th } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { HomeLayout } from "@/components/Home/layout";
import { InventoriesTableItem } from "@/components/pages/inventories/inventories-table-item";
import { Pagination } from "@/components/Pagination/pagination";
import { SearchBar } from "@/components/search-bar";
import { BaseTable } from "@/components/Table";
import { useListAllEstablishments } from "@/services/Establishments/useListAllEstablishments";
import { useListInventories } from "@/services/Inventories/useListInventories";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { NextPageWithLayout } from "../_app";

interface InventoriesPageProps {
  page: number;
  sort: string | null;
}

const TableHeaders = () => (
  <>
    <Th>Número identificador</Th>
    <Th>Estabelecimento</Th>
    <Th>Produtos</Th>
    <Th textAlign="center">Status</Th>
    <Th textAlign="center">Ações</Th>
  </>
);

const InventoriesPage: NextPageWithLayout<InventoriesPageProps> = ({
  page,
  sort,
}) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data: establishments } = useListAllEstablishments();
  const { data: inventoriesData, isLoading } = useListInventories(page, sort);

  const inventories = inventoriesData?.data;

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
        placeholder="Procurar pelo número identificador do inventário"
        onFilter={handleFilterChange}
        filterOptions={establishments?.map((e) => ({
          value: e.id,
          label: e.name,
        }))}
      />

      <BaseTable h="612px" headers={<TableHeaders />}>
        {inventories?.map((inventory) => (
          <InventoriesTableItem key={inventory.id} inventory={inventory} />
        ))}
      </BaseTable>
      <Flex px="40px" mt="40px" align="center" justify="space-between">
        <Text color="gray_800" fontWeight="medium">
          Página {page} de {inventoriesData?.lastPage}
        </Text>

        <Pagination
          w="fit-content"
          currentPage={page}
          lastPage={inventoriesData?.lastPage}
        />
      </Flex>
    </>
  );
};

InventoriesPage.getLayout = (page) => {
  return <HomeLayout slug="Inventários">{page}</HomeLayout>;
};

export const getServerSideProps = withAuthServerSideProps(async (ctx) => {
  const { page = "1", sort = null } = ctx.query;

  return {
    props: {
      page: Number(page),
      sort,
    },
  };
});

export default InventoriesPage;
