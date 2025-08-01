import { createContext, Dispatch, SetStateAction, useState } from "react";

import { Book } from "@/shared/types/book";
import { User } from "@/shared/types/users";

interface ITableCheckboxContext {
  selectedBooks: Book[];
  selectedUsers: User[];
  toggleSelectBook: (book: Book) => void;
  toggleSelectUser: (user: User) => void;
  setSelectedBooks: Dispatch<SetStateAction<Book[]>>;
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
  toggleSelectAllBooks: (books: Book[]) => void;
  toggleSelectAllUsers: (users: User[]) => void;
}

export const TableCheckboxContext = createContext({} as ITableCheckboxContext);

export function TableCheckboxProvider({ children }: { children: React.ReactNode }) {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  function toggleSelectAllBooks(books: Book[]) {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books);
    }
  }

  function toggleSelectAllUsers(users: User[]) {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users);
    }
  }

  function toggleSelectBook(book: Book) {
    if (selectedBooks.some((b) => b.id === book.id)) {
      setSelectedBooks(selectedBooks.filter((b) => b.id !== book.id));
    } else {
      setSelectedBooks([...selectedBooks, book]);
    }
  }

  function toggleSelectUser(user: User) {
    if (selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  }

  return (
    <TableCheckboxContext.Provider
      value={{
        selectedBooks,
        selectedUsers,
        toggleSelectBook,
        toggleSelectUser,
        setSelectedBooks,
        setSelectedUsers,
        toggleSelectAllBooks,
        toggleSelectAllUsers,
      }}
    >
      {children}
    </TableCheckboxContext.Provider>
  );
}
