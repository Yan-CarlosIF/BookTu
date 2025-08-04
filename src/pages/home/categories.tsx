import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

import { HomeLayout } from "@/components/Home/layout";
import { SearchBar } from "@/components/search-bar";
import { SimpleTable } from "@/components/SimpleTable";
import { SimpleTableLoading } from "@/components/SimpleTable/loading";
import { useDataFilter } from "@/hooks/useDataFilter";
import { UseListCategories } from "@/services/Categories/useListCategories";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { NextPageWithLayout } from "../_app";

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

  const filteredCategories = useDataFilter({
    data: data?.categories,
    searchValue: search,
    searchKeys: ["name"],
  });

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
        <SimpleTable
          data={{
            categories: filteredCategories,
            total: filteredCategories.length,
            page: data?.page,
            lastPage: data?.lastPage,
          }}
        />
      )}
    </>
  );
};

CategoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout slug="categories">{page}</HomeLayout>;
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
