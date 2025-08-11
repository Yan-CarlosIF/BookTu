import { Th } from "@chakra-ui/react";
import { ReactElement, useContext, useState } from "react";

import { HomeLayout } from "@/components/Home/layout";
import { SearchBar } from "@/components/search-bar";
import { BaseTable } from "@/components/Table";
import { LoadingEstablishments } from "@/components/Table/LoadingState/loading-establishments";
import {
  TableCheckboxContext,
  TableCheckboxProvider,
} from "@/context/checkboxContext";
import { userContext } from "@/context/userContext";
import { NextPageWithLayout } from "@/pages/_app";
import { useListEstablishments } from "@/services/Establishments/useListEstablishments";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { EstablishmentsTableContent } from "./_components/establishments-table-content";
import { EstablishmentsTableItem } from "./_components/establishments-table-item";

interface EstablishmentsPageProps {
  page: number;
}

const EstablishmentsPageContent: NextPageWithLayout<
  EstablishmentsPageProps
> = ({ page }) => {
  const { user, isLoading } = useContext(userContext);
  const isAdmin = !isLoading && user?.permission === "admin";

  const [search, setSearch] = useState("");

  const { selectedData, toggleSelectAll } = useContext(TableCheckboxContext);

  const { data, isLoading: isEstablishmentsLoading } =
    useListEstablishments(page);

  const filteredEstablishments = data?.establishments.filter((e) => {
    return (
      e.name.toLowerCase().includes(search) ||
      e.cnpj.toLowerCase().includes(search)
    );
  });

  return (
    <>
      <SearchBar
        onSearch={setSearch}
        placeholder="Buscar pelo nome ou CNPJ"
        searchValue={search}
      />
      {isEstablishmentsLoading ? (
        <LoadingEstablishments />
      ) : (
        <>
          <BaseTable
            h="612px"
            checkbox={isAdmin}
            isCheckboxChecked={
              selectedData?.length === filteredEstablishments?.length
            }
            isCheckboxIndeterminate={
              selectedData?.length > 0 &&
              selectedData?.length < filteredEstablishments?.length
            }
            onCheckboxChange={() => toggleSelectAll(filteredEstablishments)}
            headers={
              <>
                <Th>Nome</Th>
                <Th>CNPJ</Th>
                <Th>Endereço</Th>
              </>
            }
          >
            {filteredEstablishments.map((e) => (
              <EstablishmentsTableItem key={e.id} establishment={e} />
            ))}
          </BaseTable>
          <EstablishmentsTableContent page={page} lastPage={data?.lastPage} />
        </>
      )}
    </>
  );
};

const EstablishmentsPage: NextPageWithLayout<EstablishmentsPageProps> = ({
  page,
}) => {
  return (
    <TableCheckboxProvider>
      <EstablishmentsPageContent page={page} />
    </TableCheckboxProvider>
  );
};

EstablishmentsPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout slug="Estabelecimentos">{page}</HomeLayout>;
};

export const getServerSideProps = withAuthServerSideProps(async (ctx) => {
  const { page } = ctx.query;

  return {
    props: {
      page: page ? Number(page) : 1,
    },
  };
});

export default EstablishmentsPage;
