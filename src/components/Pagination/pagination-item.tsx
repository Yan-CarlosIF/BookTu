import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
  children: React.ReactNode;
}

export function PaginationItem({
  isCurrent = false,
  onPageChange,
  children,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="teal"
        disabled
        _disabled={{
          bgColor: "highlight_blue",
          cursor: "default",
        }}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      onClick={() => onPageChange(Number(children))}
      size="sm"
      fontSize="xs"
      width="4"
      variant="outline"
    >
      {children}
    </Button>
  );
}
