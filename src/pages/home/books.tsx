import { useRouter } from "next/router";
import { ReactElement, useMemo, useState } from "react";

import { CheckBoxTableBooks } from "@/components/CheckboxTable/books";
import { CheckboxTableBooksLoading } from "@/components/CheckboxTable/LoadingState/loading-books";
import { HomeLayout } from "@/components/Home/layout";
import { SearchBar } from "@/components/search-bar";
import { TableCheckboxProvider } from "@/context/checkboxContext";
import { UseListBooks } from "@/services/Books/useListBooks";
import { withAuthServerSideProps } from "@/utils/withAuth";

import { NextPageWithLayout } from "../_app";

type BooksPageProps = {
  name: string;
  page: number;
  sort?: string;
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

const BooksPage: NextPageWithLayout<BooksPageProps> = ({
  page,
  sort,
  isAdmin,
}) => {
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

  const filteredData = useMemo(() => {
    if (!data?.books || !search.trim()) {
      return data;
    }

    const filteredBooks = data.books.filter(
      (book) =>
        book.title?.toLowerCase().includes(search.toLowerCase().trim()) ||
        book.author?.toLowerCase().includes(search.toLowerCase().trim())
    );

    return {
      lastPage: Math.ceil(filteredBooks.length / 10),
      page,
      total: filteredBooks.length,
      books: filteredBooks,
    };
  }, [data, search, page]);

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
          <CheckBoxTableBooks
            data={{
              ...filteredData,
              data: filteredData?.books || [],
            }}
            isAdmin={isAdmin}
          />
        </TableCheckboxProvider>
      )}
    </>
  );
};

BooksPage.getLayout = function getLayout(
  page: ReactElement,
  { name, isAdmin }: BooksPageProps
) {
  return (
    <HomeLayout isAdmin={isAdmin} slug="books" name={name}>
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

export default BooksPage;
