import { Button, Flex, Text } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

import { ActionBar } from "@/components/ActionBar/action-bar";
import { Pagination } from "@/components/Pagination/pagination";
import { TableCheckboxContext } from "@/context/checkboxContext";
import { userContext } from "@/context/userContext";
import { Inventory } from "@/shared/types/inventory";

interface InventoriesTableContentProps {
  page: number;
  lastPage: number;
}

export function InventoriesTableContent({
  page,
  lastPage,
}: InventoriesTableContentProps) {
  const router = useRouter();
  const { user, isLoading } = useContext(userContext);
  const isAdmin = !isLoading && user?.permission === "admin";

  const { selectedData, setSelectedData } = useContext(TableCheckboxContext);

  const inventory = selectedData[0] as Inventory;

  return (
    <Flex px="40px" mt="40px" align="center" justify="space-between">
      <Text color="gray_800" fontWeight="medium">
        Página {page} de {lastPage}
      </Text>

      <Link href="/home/inventories/inventory" passHref>
        <Button colorScheme="teal" px="16px" rightIcon={<Plus />}>
          Adicionar
        </Button>
      </Link>

      <Pagination w="fit-content" currentPage={page} lastPage={lastPage} />
      <ActionBar count={selectedData.length}>
        <Button
          color="gray_800"
          variant="outline"
          size="sm"
          onClick={() => setSelectedData([])}
        >
          Cancelar
        </Button>
        {isAdmin && (
          <Button colorScheme="red" size="sm">
            Excluir
          </Button>
        )}
        {selectedData?.length === 1 && inventory.status === "unprocessed" && (
          <>
            <Button
              color="gray_800"
              variant="outline"
              size="sm"
              onClick={() =>
                router.push(`inventories/inventory?id=${inventory.id}`)
              }
            >
              Editar
            </Button>
          </>
        )}
      </ActionBar>
    </Flex>
  );
}
