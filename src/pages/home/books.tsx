import { GetServerSideProps } from "next";
import { HomeLayout } from "@/components/Home/layout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { api } from "@/lib/axios";
import { withAuthServerSideProps } from "@/utils/withAuth";

type BooksPageProps = {
  name: string;
};

const BooksPage: NextPageWithLayout<BooksPageProps> = () => {
  return (
    <div>
      <p>Lista de livros aqui...</p>
    </div>
  );
};

BooksPage.getLayout = function getLayout(
  page: ReactElement,
  pageProps: BooksPageProps
) {
  return (
    <HomeLayout slug="books" name={pageProps.name}>
      {page}
    </HomeLayout>
  );
};

export const getServerSideProps = withAuthServerSideProps(async (ctx, user) => {
  return {
    props: {
      name: user.name,
    },
  };
});

export default BooksPage;
