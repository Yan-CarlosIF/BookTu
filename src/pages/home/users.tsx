import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

import { CheckboxTableUsersLoading } from "@/components/CheckboxTable/LoadingState/loading-users";
import { CheckboxTableUsers } from "@/components/CheckboxTable/users";
import { HomeLayout } from "@/components/Home/layout";
import { SearchBar } from "@/components/search-bar";
import { TableCheckboxProvider } from "@/context/checkboxContext";
import { useListUsers } from "@/services/Users/useListUsers";
import { ensureUserAdmin } from "@/utils/ensureUserAdmin";

import { NextPageWithLayout } from "../_app";

export type UsersPageProps = {
  name: string;
  page: number;
  sort?: string | null;
  isAdmin: boolean;
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
  {
    value: "operator",
    label: "Operador",
  },
  {
    value: "admin",
    label: "Admin",
  },
];

const UsersPage: NextPageWithLayout<UsersPageProps> = ({ page, sort }) => {
  const { data, isLoading } = useListUsers(page, sort);
  const [search, setSearch] = useState("");
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
        <CheckboxTableUsersLoading />
      ) : (
        <TableCheckboxProvider>
          <CheckboxTableUsers
            data={{
              data: data.users,
              total: data.total,
              page: data.page,
              lastPage: data.lastPage,
            }}
          />
        </TableCheckboxProvider>
      )}
    </>
  );
};

UsersPage.getLayout = function getLayout(
  page: ReactElement,
  pageProps: UsersPageProps
) {
  return (
    <HomeLayout isAdmin={pageProps.isAdmin} slug="users" name={pageProps.name}>
      {page}
    </HomeLayout>
  );
};

export const getServerSideProps = ensureUserAdmin(
  async (ctx, { name, isAdmin }) => {
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

export default UsersPage;
