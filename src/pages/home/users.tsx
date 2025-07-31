import {
  Box,
  Button,
  Checkbox,
  Flex,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

import { ActionBar } from "@/components/ActionBar/action-bar";
import { CheckboxUserTable } from "@/components/CheckboxTable/user";
import { HomeLayout } from "@/components/Home/layout";
import { Input } from "@/components/input";
import { Pagination } from "@/components/Pagination/pagination";
import { useListUsers } from "@/services/Users/useListUsers";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { NextPageWithLayout } from "../_app";

export type UsersPageProps = {
  name: string;
  page: number;
  sort?: string | null;
};

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
      <Flex
        boxShadow="lg"
        mt="36px"
        align="center"
        bg="gray_300"
        borderRadius="lg"
        px="24px"
        py="18px"
        gap="160px"
      >
        <Input
          h="42px"
          bg="background"
          placeholder="Procurar pelo nome do usuário"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={Search}
        />
        <Select
          mr="20px"
          focusBorderColor="teal.300"
          placeholder="Filtros"
          bg="highlight_blue"
          color="background"
          fontWeight="medium"
          h="42px"
          w="210px"
          _hover={{ bg: "teal.400" }}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="operator">Operador</option>
          <option value="admin">Admin</option>
        </Select>
      </Flex>

      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <CheckboxUserTable
          data={{
            data: data.users,
            total: data.total,
            page: data.page,
            lastPage: data.lastPage,
          }}
        />
      )}
    </>
  );
};

UsersPage.getLayout = function getLayout(
  page: ReactElement,
  pageProps: UsersPageProps
) {
  return (
    <HomeLayout slug="users" name={pageProps.name}>
      {page}
    </HomeLayout>
  );
};

export const getServerSideProps = withAuthServerSideProps(async (ctx, user) => {
  const { page, sort } = ctx.query;

  return {
    props: {
      name: user.name,
      page: page ? Number(page) : 1,
      sort: sort ?? null,
    },
  };
});

export default UsersPage;
