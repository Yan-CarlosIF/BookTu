import { Th } from "@chakra-ui/react";
import { ReactElement, useContext, useState } from "react";

import { HomeLayout } from "@/components/Home/layout";
import { SearchBar } from "@/components/search-bar";
import { BaseTable } from "@/components/Table";
import {
  TableCheckboxContext,
  TableCheckboxProvider,
} from "@/context/checkboxContext";
import { userContext } from "@/context/userContext";
import { NextPageWithLayout } from "@/pages/_app";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { EstablishmentsTableContent } from "./_components/establishments-table-content";
import { EstablishmentsTableItem } from "./_components/establishments-table-item";

interface EstablishmentsPageProps {
  page: number;
}

const dummyData = [
  {
    id: "1",
    name: "Livraria Central",
    cnpj: "12.345.678/0001-90",
    city: "Fortaleza",
    state: "CE",
    description: "Descrição do estabelecimento",
    cep: "12345-678",
    district: "Centro",
  },
  {
    id: "2",
    name: "Estante Cultural",
    cnpj: "98.765.432/0001-12",
    city: "Aracati",
    state: "CE",
    description: "Descrição do estabelecimento",
    cep: "12345-678",
    district: "Centro",
  },
  {
    id: "3",
    name: "Livraria Central",
    cnpj: "12.345.678/0001-90",
    city: "Fortaleza",
    state: "CE",
    description: "Descrição do estabelecimento",
    cep: "12345-678",
    district: "Centro",
  },
  {
    id: "4",
    name: "Estante Cultural",
    cnpj: "98.765.432/0001-12",
    city: "Aracati",
    state: "CE",
    description: "Descrição do estabelecimento",
    cep: "12345-678",
    district: "Centro",
  },
  {
    id: "5",
    name: "Livraria Central",
    cnpj: "12.345.678/0001-90",
    city: "Fortaleza",
    state: "CE",
    description: "Descrição do estabelecimento",
    cep: "12345-678",
    district: "Centro",
  },
  {
    id: "6",
    name: "Estante Cultural",
    cnpj: "98.765.432/0001-12",
    city: "Aracati",
    state: "CE",
    description: "Descrição do estabelecimento",
    cep: "12345-678",
    district: "Centro",
  },
  {
    id: "7",
    name: "Livraria Central",
    cnpj: "12.345.678/0001-90",
    city: "Fortaleza",
    state: "CE",
    description: "Descrição do estabelecimento",
    cep: "12345-678",
    district: "Centro",
  },
  {
    id: "8",
    name: "Estante Cultural",
    cnpj: "98.765.432/0001-12",
    city: "Aracati",
    state: "CE",
    description: "Descrição do estabelecimento",
    cep: "12345-678",
    district: "Centro",
  },
  {
    id: "9",
    name: "Livraria Central",
    cnpj: "12.345.678/0001-90",
    city: "Fortaleza",
    state: "CE",
    description: "Descrição do estabelecimento",
    cep: "12345-678",
    district: "Centro",
  },
  {
    id: "10",
    name: "Estante Cultural",
    cnpj: "98.765.432/0001-12",
    city: "Aracati",
    state: "CE",
    description: "Descrição do estabelecimento",
    cep: "12345-678",
    district: "Centro",
  },
];

const EstablishmentsPageContent: NextPageWithLayout<
  EstablishmentsPageProps
> = ({ page }) => {
  const { user, isLoading } = useContext(userContext);
  const isAdmin = !isLoading && user?.permission === "admin";

  const [search, setSearch] = useState("");
  const [establishments, setEstablishments] = useState(dummyData);

  const { selectedData, toggleSelectAll } = useContext(TableCheckboxContext);

  const filteredEstablishments = establishments.filter((e) => {
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
      <EstablishmentsTableContent page={page} lastPage={page} />
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
