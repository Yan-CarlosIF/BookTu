import { Button, IconButton, Td, Tr } from "@chakra-ui/react";
import { Pencil, Trash } from "lucide-react";
import { useContext } from "react";

import { userContext } from "@/context/userContext";
import { Establishment } from "@/shared/types/establishment";

interface EstablishmentsTableItemProps {
  establishment: Establishment;
}

export function EstablishmentsTableItem({
  establishment: e,
}: EstablishmentsTableItemProps) {
  const { user, isLoading } = useContext(userContext);
  const isAdmin = !isLoading && user?.permission === "admin";

  return (
    <Tr key={e.id}>
      <Td py="8px">{e.name}</Td>
      <Td py="8px">{e.cnpj}</Td>
      <Td py="8px">{e.city}</Td>
      <Td py="8px">{e.state}</Td>
      <Td
        alignItems="center"
        py="8px"
        display="flex"
        gap="12px"
        justifyContent="center"
        textAlign="center"
      >
        <Button size="sm" fontSize="sm" colorScheme="teal">
          Visualizar Inventário
        </Button>
        {isAdmin && (
          <>
            <IconButton
              aria-label="Editar"
              icon={<Pencil size={16} />}
              variant="ghost"
              onClick={() => alert(`Editar ${e.name}`)}
            />
            <IconButton
              aria-label="Excluir"
              icon={<Trash size={16} />}
              variant="ghost"
              colorScheme="red"
              onClick={() => alert(`Excluir ${e.name}`)}
            />
          </>
        )}
      </Td>
    </Tr>
  );
}
