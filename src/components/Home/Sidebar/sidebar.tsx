import { Box, Heading, Stack } from "@chakra-ui/react";
import { Book, LogOut, PlusCircle, Users } from "lucide-react";

import { SidebarItem } from "./sidebar-item";

export function Sidebar({ slug }: { slug: string }) {
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
        <SidebarItem
          icon={Users}
          title="Usuários"
          href="/home/users"
          isActive={slug === "users"}
        />
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
