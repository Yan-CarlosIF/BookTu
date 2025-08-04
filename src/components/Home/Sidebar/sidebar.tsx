import { Box, Flex, Heading } from "@chakra-ui/react";
import { Book, LogOut, PlusCircle, Users, Warehouse } from "lucide-react";
import { useContext } from "react";

import { userContext } from "@/context/userContext";

import { SidebarItem } from "./sidebar-item";

interface SidebarProps {
  slug: string;
}

export function Sidebar({ slug }: SidebarProps) {
  const { user, isLoading } = useContext(userContext);

  const isAdmin = !isLoading && user?.permission === "admin";

  return (
    <Box
      h="full"
      as="aside"
      display="flex"
      flexDir="column"
      alignItems="center"
      width={350}
      bg="gray_300"
      borderWidth={1}
      borderColor="gray_500"
      py="48px"
    >
      <Heading color="gray_800" as="h1" fontSize="4xl">
        BookTu
      </Heading>
      <Flex gap="24px" direction="column" h="full" w="full" mt="48px">
        <SidebarItem
          icon={Warehouse}
          title="Estabelecimentos"
          href="/home/establishments"
          isActive={slug === "establishments"}
        />
        <SidebarItem
          icon={Book}
          title="Livros"
          href="/home/books"
          isActive={slug === "books"}
        />
        {!isLoading && isAdmin && (
          <SidebarItem
            icon={Users}
            title="Usuários"
            href="/home/users"
            isActive={slug === "users"}
          />
        )}
        <SidebarItem
          icon={PlusCircle}
          title="Categorias"
          href="/home/categories"
          isActive={slug === "categories"}
        />
        <SidebarItem mt="auto" icon={LogOut} title="Sair" href="/" />
      </Flex>
    </Box>
  );
}
