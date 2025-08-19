import { Th } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, useContext, useState } from "react";

import { HomeLayout } from "@/components/Home/layout";
import { SearchBar } from "@/components/search-bar";
import { BaseTable } from "@/components/Table";
import { CheckboxTableBooksLoading } from "@/components/Table/LoadingState/loading-books";
import {
  TableCheckboxContext,
  TableCheckboxProvider,
} from "@/context/checkboxContext";
import { useDebounce } from "@/hooks/useDebounce";
import { UseListBooks } from "@/services/Books/useListBooks";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { BooksTableContent } from "../../components/pages/books/books-table-content";
import { BooksTableItem } from "../../components/pages/books/books-table-item";
import { NextPageWithLayout } from "../_app";

type BooksPageProps = {
  page: number;
  sort?: string;
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
    value: "price-asc",
    label: "Menor preço",
  },
  {
    value: "price-desc",
    label: "Maior preço",
  },
  {
    value: "latest",
    label: "Mais recentes",
  },
  {
    value: "oldest",
    label: "Mais antigos",
  },
];

const TableHeaders = () => (
  <>
    <Th>Identificador</Th>
    <Th>Título</Th>
    <Th>Categoria(s)</Th>
    <Th>Ano de Lançamento</Th>
    <Th isNumeric>Preço (R$)</Th>
  </>
);

const BooksPageContent: NextPageWithLayout<BooksPageProps> = ({
  page,
  sort,
}) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { data, isLoading } = UseListBooks(page, sort, debouncedSearch);
  const router = useRouter();

  const { selectedData, toggleSelectAll } = useContext(TableCheckboxContext);

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
        placeholder="Buscar pelo título, autor ou identificador"
        onSearch={setSearch}
        onFilter={handleFilterChange}
        filterOptions={filterOptions}
      />
      {isLoading ? (
        <CheckboxTableBooksLoading />
      ) : (
        <>
          <BaseTable
            h="575px"
            isCheckboxChecked={selectedData?.length === data.books.length}
            isCheckboxIndeterminate={
              selectedData?.length > 0 &&
              selectedData?.length < data.books.length
            }
            onCheckboxChange={() => toggleSelectAll(data.books)}
            checkbox
            headers={<TableHeaders />}
          >
            {data.books.map((book) => (
              <BooksTableItem book={book} key={book.id} />
            ))}
          </BaseTable>
          <BooksTableContent page={page} lastPage={data?.lastPage} />
        </>
      )}
    </>
  );
};

const BooksPage: NextPageWithLayout<BooksPageProps> = ({ page, sort }) => {
  return (
    <TableCheckboxProvider>
      <BooksPageContent page={page} sort={sort} />
    </TableCheckboxProvider>
  );
};

BooksPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout slug="Livros">{page}</HomeLayout>;
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

export default BooksPage;
