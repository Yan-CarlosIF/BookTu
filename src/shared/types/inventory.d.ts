import { Establishment } from "./establishment";
import { InventoryBook } from "./inventory-book";

export enum Status {
  PROCESSED = "processed",
  UNPROCESSED = "unprocessed",
}

export type Inventory = {
  id: string;
  identifier: number;
  total_quantity: number;
  establishment_id: string;
  establishment: Establishment;
  books: InventoryBook[];
  status: Status;
};
