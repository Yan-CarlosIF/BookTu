import { Box, Flex, Heading } from "@chakra-ui/react";

import { Sidebar } from "./Sidebar/sidebar";
import { UserHeader } from "./user-header";

type HomeLayoutProps = {
  children: React.ReactNode;
  slug: string;
};

export function HomeLayout({ children, slug }: HomeLayoutProps) {
  const getDisplayTitle = () => {
    switch (slug) {
      case "books":
        return "Livros";
      case "categories":
        return "Categorias";
      case "users":
        return "Usuários";
    }
  };

  const displayTitle = getDisplayTitle();

  return (
    <Flex as="main" w="100%" h="100vh">
      <Sidebar slug={slug} />
      <Box p="40px" as="main" w="100%" h="100vh">
        <Flex align="center" justify="space-between">
          <Heading as="h1" fontFamily="poppins" fontSize="4xl">
            {displayTitle}
          </Heading>
          <UserHeader />
        </Flex>
        {children}
      </Box>
    </Flex>
  );
}
