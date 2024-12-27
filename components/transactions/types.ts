export interface Transaction {
  avatar?: string | null;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}
