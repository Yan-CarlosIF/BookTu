import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

import { HomeLayout } from "@/components/Home/layout";
import { SearchBar } from "@/components/search-bar";
import { SimpleTable } from "@/components/SimpleTable";
import { SimpleTableLoading } from "@/components/SimpleTable/loading";
import { UseListCategories } from "@/services/Categories/useListCategories";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { NextPageWithLayout } from "../_app";

export type CategoriesPageProps = {
  name: string;
  page: number;
  sort?: string | null;
  isAdmin?: boolean;
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
  isAdmin,
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
        <SimpleTable isAdmin={isAdmin} data={data} />
      )}
    </>
  );
};

CategoriesPage.getLayout = function getLayout(
  page: ReactElement,
  { name, isAdmin }: CategoriesPageProps
) {
  return (
    <HomeLayout isAdmin={isAdmin} slug="categories" name={name}>
      {page}
    </HomeLayout>
  );
};

export const getServerSideProps = withAuthServerSideProps(
  async (ctx, { isAdmin, name }) => {
    const { page, sort } = ctx.query;

    return {
      props: {
        name,
        isAdmin,
        page: page ? Number(page) : 1,
        sort: sort ?? null,
      },
    };
  }
);

export default CategoriesPage;
