import { Box, Flex, Heading } from "@chakra-ui/react";

import { Sidebar } from "./Sidebar/sidebar";
import { UserHeader } from "./user-header";

type HomeLayoutProps = {
  children: React.ReactNode;
  slug: string;
  name: string;
  isAdmin?: boolean;
};

export function HomeLayout({
  children,
  slug,
  name,
  isAdmin = false,
}: HomeLayoutProps) {
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
      <Sidebar isAdmin={isAdmin} slug={slug} />
      <Box p="40px" as="main" w="100%" h="100vh">
        <Flex align="center" justify="space-between">
          <Heading as="h1" fontFamily="poppins" fontSize="4xl">
            {displayTitle}
          </Heading>
          <UserHeader name={name} />
        </Flex>
        {children}
      </Box>
    </Flex>
  );
}
