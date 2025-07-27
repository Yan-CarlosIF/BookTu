import { HomeLayout } from "@/components/Home/layout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { withAuthServerSideProps } from "@/utils/withAuth";

export type CategoriesPageProps = {
  name: string;
};

const CategoriesPage: NextPageWithLayout = () => {
  return (
    <div>
      <p>Lista de categorias aqui...</p>
    </div>
  );
};

CategoriesPage.getLayout = function getLayout(
  page: ReactElement,
  pageProps: CategoriesPageProps
) {
  return (
    <HomeLayout slug="categories" name={pageProps.name}>
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

export default CategoriesPage;
