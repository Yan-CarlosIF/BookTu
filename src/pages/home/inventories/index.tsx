import { Th } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import { HomeLayout } from "@/components/Home/layout";
import { InventoriesTableContent } from "@/components/pages/inventories/inventories-table-content";
import { InventoriesTableItem } from "@/components/pages/inventories/inventories-table-item";
import { SearchBar } from "@/components/search-bar";
import { BaseTable } from "@/components/Table";
import {
  TableCheckboxContext,
  TableCheckboxProvider,
} from "@/context/checkboxContext";
import { userContext } from "@/context/userContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useListAllEstablishments } from "@/services/Establishments/useListAllEstablishments";
import { useListInventories } from "@/services/Inventories/useListInventories";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { NextPageWithLayout } from "../../_app";

interface InventoriesPageProps {
  page: number;
  sort: string | null;
}

const TableHeaders = () => {
  const { isLoading, user } = useContext(userContext);

  const isAdmin = !isLoading && user?.permission === "admin";

  return (
    <>
      <Th>Número identificador</Th>
      <Th>Estabelecimento</Th>
      <Th textAlign="center">Total de produtos</Th>
      <Th textAlign="center">Status</Th>
      {isAdmin && <Th textAlign="center">Processar</Th>}
    </>
  );
};

const InventoriesPageContent: NextPageWithLayout<InventoriesPageProps> = ({
  page,
  sort,
}) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [isProcessing, setIsProcessing] = useState(false);
  const { data: establishments } = useListAllEstablishments();
  const { data: inventoriesData } = useListInventories(
    page,
    sort,
    debouncedSearch
  );

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

  const { selectedData, toggleSelectAll } = useContext(TableCheckboxContext);

  return (
    <>
      <SearchBar
        searchValue={search}
        onSearch={setSearch}
        placeholder="Buscar pelo número identificador do inventário"
        onFilter={handleFilterChange}
        filterOptions={establishments?.map((e) => ({
          value: e.id,
          label: e.name,
        }))}
      />

      <BaseTable
        checkbox
        h="612px"
        isCheckboxChecked={selectedData?.length === inventories?.length}
        isCheckboxIndeterminate={
          selectedData?.length > 0 && selectedData?.length < inventories?.length
        }
        onCheckboxChange={() => toggleSelectAll(inventories)}
        headers={<TableHeaders />}
      >
        {inventories?.map((inventory) => (
          <InventoriesTableItem
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            key={inventory.id}
            inventory={inventory}
          />
        ))}
      </BaseTable>
      <InventoriesTableContent
        page={page}
        lastPage={inventoriesData?.lastPage}
      />
    </>
  );
};

const InventoriesPage: NextPageWithLayout<InventoriesPageProps> = ({
  page,
  sort,
}) => {
  return (
    <TableCheckboxProvider>
      <InventoriesPageContent page={page} sort={sort} />;
    </TableCheckboxProvider>
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
