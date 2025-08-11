import { Th } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, useContext, useState } from "react";

import { HomeLayout } from "@/components/Home/layout";
import { SearchBar } from "@/components/search-bar";
import { BaseTable } from "@/components/Table";
import { CheckboxTableUsersLoading } from "@/components/Table/LoadingState/loading-users";
import {
  TableCheckboxContext,
  TableCheckboxProvider,
} from "@/context/checkboxContext";
import { useListUsers } from "@/services/Users/useListUsers";
import { ensureUserAdmin } from "@/utils/ensureUserAdmin";

import { UserTableContent } from "../../components/pages/users/user-table-content";
import { UserTableItem } from "../../components/pages/users/user-table-item";
import { NextPageWithLayout } from "../_app";

export type UsersPageProps = {
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
  {
    value: "operator",
    label: "Operador",
  },
  {
    value: "admin",
    label: "Admin",
  },
];

const TableHeaders = () => (
  <>
    <Th>Nome</Th>
    <Th>Matrícula</Th>
    <Th isNumeric>Permissão</Th>
  </>
);

const UsersPageContent: NextPageWithLayout<UsersPageProps> = ({
  page,
  sort,
}) => {
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

  const filteredUsers = data?.users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  const { selectedData, toggleSelectAll } = useContext(TableCheckboxContext);

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
        <>
          <BaseTable
            h="575px"
            isCheckboxChecked={selectedData.length === filteredUsers?.length}
            isCheckboxIndeterminate={
              selectedData.length > 0 &&
              selectedData.length < filteredUsers?.length
            }
            onCheckboxChange={() => toggleSelectAll(filteredUsers)}
            headers={<TableHeaders />}
            checkbox
          >
            {filteredUsers?.map((user) => (
              <UserTableItem key={user.id} user={user} />
            ))}
          </BaseTable>
          <UserTableContent page={page} lastPage={data?.lastPage} />
        </>
      )}
    </>
  );
};

const UsersPage: NextPageWithLayout<UsersPageProps> = ({ page, sort }) => {
  return (
    <TableCheckboxProvider>
      <UsersPageContent page={page} sort={sort} />;
    </TableCheckboxProvider>
  );
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout slug="Usuários">{page}</HomeLayout>;
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
