import { Th } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, useContext, useState } from "react";

import { HomeLayout } from "@/components/Home/layout";
import { SearchBar } from "@/components/search-bar";
import { BaseTable } from "@/components/Table";
import { SimpleTableLoading } from "@/components/Table/LoadingState/loading-categories";
import { userContext } from "@/context/userContext";
import { UseListCategories } from "@/services/Categories/useListCategories";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { NextPageWithLayout } from "../../_app";
import { CategoriesTableContent } from "./_components/categories-table-content";
import { CategoriesTableItem } from "./_components/categories-table-item";

export type CategoriesPageProps = {
  page: number;
  sort?: string | null;
};

const filterOptions = [
  {
    value: "asc",
    label: "A-Z",
  },
  {
    value: "desc",
    label: "Z-A",
  },
];

const TableHeaders = () => {
  const { user, isLoading } = useContext(userContext);

  return (
    <>
      <Th>Nome</Th>
      <Th>Editar</Th>
      {!isLoading && user?.permission === "admin" && <Th>Deletar</Th>}
    </>
  );
};

const CategoriesPage: NextPageWithLayout<CategoriesPageProps> = ({
  page,
  sort,
}) => {
  const [search, setSearch] = useState("");
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

  const filteredCategories = data?.categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <>
      <SearchBar
        searchValue={search}
        placeholder="Buscar pelo nome"
        onSearch={setSearch}
        onFilter={handleFilterChange}
        filterOptions={filterOptions}
      />

      {isLoading ? (
        <SimpleTableLoading />
      ) : (
        <>
          <BaseTable h="575px" headers={<TableHeaders />}>
            {filteredCategories.map((category) => (
              <CategoriesTableItem key={category.id} category={category} />
            ))}
          </BaseTable>
          <CategoriesTableContent page={page} lastPage={data?.lastPage} />
        </>
      )}
    </>
  );
};

CategoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout slug="Categorias">{page}</HomeLayout>;
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

export default CategoriesPage;
