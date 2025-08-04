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
import { UseListBooks } from "@/services/Books/useListBooks";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { NextPageWithLayout } from "../../_app";
import { BooksTableContent } from "./_components/books-table-content";
import { BooksTableItem } from "./_components/books-table-item";

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
    <Th>Título</Th>
    <Th>Categoria(s)</Th>
    <Th>Ano de Lançamento</Th>
    <Th isNumeric>Preço (R$)</Th>
  </>
);

const BooksPage: NextPageWithLayout<BooksPageProps> = ({ page, sort }) => {
  const { data, isLoading } = UseListBooks(page, sort);
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

  const filteredBooks = data?.books.filter((book) => {
    return (
      book.title.toLowerCase().includes(search.toLowerCase().trim()) ||
      book.author.toLowerCase().includes(search.toLowerCase().trim())
    );
  });

  const { selectedBooks, toggleSelectAllBooks } =
    useContext(TableCheckboxContext);

  return (
    <>
      <SearchBar
        searchValue={search}
        placeholder="Buscar pelo título ou autor"
        onSearch={setSearch}
        onFilter={handleFilterChange}
        filterOptions={filterOptions}
      />

      {isLoading ? (
        <CheckboxTableBooksLoading />
      ) : (
        <TableCheckboxProvider>
          <BaseTable
            isCheckboxChecked={selectedBooks?.length === filteredBooks?.length}
            isCheckboxIndeterminate={
              selectedBooks?.length > 0 &&
              selectedBooks?.length < filteredBooks?.length
            }
            onCheckboxChange={() => toggleSelectAllBooks(filteredBooks)}
            checkbox
            headers={<TableHeaders />}
          >
            {filteredBooks?.map((book) => (
              <BooksTableItem book={book} key={book.id} />
            ))}
          </BaseTable>
          <BooksTableContent page={page} lastPage={data?.lastPage} />
        </TableCheckboxProvider>
      )}
    </>
  );
};

BooksPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout slug="books">{page}</HomeLayout>;
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
