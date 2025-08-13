import { Box, Flex, Heading } from "@chakra-ui/react";
import {
  Book,
  Building,
  ChartColumnStacked,
  ClipboardList,
  LogOut,
  Users,
  Warehouse,
} from "lucide-react";
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
          icon={Building}
          title="Estabelecimentos"
          href="/home/establishments"
          isActive={slug === "Estabelecimentos"}
        />
        <SidebarItem
          icon={Book}
          title="Livros"
          href="/home/books"
          isActive={slug === "Livros"}
        />
        <SidebarItem
          icon={ChartColumnStacked}
          title="Categorias"
          href="/home/categories"
          isActive={slug === "Categorias"}
        />
        {!isLoading && isAdmin && (
          <SidebarItem
            icon={Users}
            title="Usuários"
            href="/home/users"
            isActive={slug === "Usuários"}
          />
        )}
        <SidebarItem
          icon={Warehouse}
          title="Estoques"
          href="/home/stocks"
          isActive={slug === "Estoques"}
        />
        <SidebarItem
          icon={ClipboardList}
          title="Inventários"
          href="/home/inventories"
          isActive={slug === "Inventários"}
        />
        <SidebarItem mt="auto" icon={LogOut} title="Sair" href="/" />
      </Flex>
    </Box>
  );
}
