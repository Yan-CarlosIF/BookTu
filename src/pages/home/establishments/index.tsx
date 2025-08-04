import { Th } from "@chakra-ui/react";
import { ReactElement, useState } from "react";

import { HomeLayout } from "@/components/Home/layout";
import { SearchBar } from "@/components/search-bar";
import { BaseTable } from "@/components/Table";
import { NextPageWithLayout } from "@/pages/_app";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { EstablishmentsPageContent } from "./_components/establishments-page-content";
import { EstablishmentsTableItem } from "./_components/establishments-table-item";

interface EstablishmentsPageProps {
  page: number;
  sort?: string;
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

const EstablishmentsPage: NextPageWithLayout<EstablishmentsPageProps> = ({
  page,
  sort,
}) => {
  const [establishments, setEstablishments] = useState(dummyData);

  return (
    <>
      <SearchBar
        onSearch={() => {}}
        placeholder="Buscar pelo nome"
        searchValue=""
      />
      <BaseTable
        headers={
          <>
            <Th>Nome</Th>
            <Th>CNPJ</Th>
            <Th>Cidade</Th>
            <Th>Estado</Th>
            <Th textAlign="center">Ações</Th>
          </>
        }
      >
        {establishments.map((e) => (
          <EstablishmentsTableItem key={e.id} establishment={e} />
        ))}
      </BaseTable>
      <EstablishmentsPageContent page={page} lastPage={page} />
    </>
  );
};

EstablishmentsPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout slug="establishments">{page}</HomeLayout>;
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

export default EstablishmentsPage;
