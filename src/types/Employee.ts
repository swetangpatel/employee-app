import { Address } from "./Address";

export interface Employee {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    addresses?: Address[];
  }

