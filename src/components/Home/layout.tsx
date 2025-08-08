import { Box, Flex, Heading } from "@chakra-ui/react";

import { Sidebar } from "./Sidebar/sidebar";
import { UserHeader } from "./user-header";

type HomeLayoutProps = {
  children: React.ReactNode;
  slug: string;
};

export function HomeLayout({ children, slug }: HomeLayoutProps) {
  return (
    <Flex as="main" w="100%" h="100vh">
      <Sidebar slug={slug} />
      <Box p="40px" as="main" w="100%" h="100vh">
        <Flex align="center" justify="space-between">
          <Heading as="h1" fontFamily="poppins" fontSize="4xl">
            {slug}
          </Heading>
          <UserHeader />
        </Flex>
        {children}
      </Box>
    </Flex>
  );
}
