import { Box, Heading, Stack } from "@chakra-ui/react";
import { Book, LogOut, PlusCircle, Users } from "lucide-react";
import { useContext } from "react";

import { userContext } from "@/context/userContext";

import { SidebarItem } from "./sidebar-item";

interface SidebarProps {
  slug: string;
}

export function Sidebar({ slug }: SidebarProps) {
  const { user, isLoading } = useContext(userContext);

  const isAdmin = !isLoading && user.permission === "admin";

  return (
    <Box
      as="aside"
      display="flex"
      flexDir="column"
      alignItems="center"
      width={350}
      bg="gray_300"
      borderWidth={1}
      borderColor="gray_500"
    >
      <Heading color="gray_800" as="h1" mt="32px" fontSize="4xl">
        BookTu
      </Heading>
      <Stack gap="10px" direction="column" h="full" w="full" mt="48px">
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
        <SidebarItem icon={LogOut} title="Sair" href="/" />
      </Stack>
    </Box>
  );
}
