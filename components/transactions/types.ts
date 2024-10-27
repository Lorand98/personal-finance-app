export interface Transaction {
    avatar: string;
    name: string;
    category: string;
    date: string;
    amount: number;
}

export enum TransactionSortingOptions {
    Latest = "latest",
    Oldest = "oldest",
    AToZ = "a_to_z",
    ZToA = "z_to_a",
    Highest = "highest",
    Lowest = "lowest",
  }
  
  export enum TransactionCategories {
    All = "all",
    Entertainment = "entertainment",
    Bills = "bills",
    Groceries = "groceries",
    DiningOut = "dining_out",
    Transportation = "transportation",
    PersonalCare = "personal_care",
    Education = "education",
    Lifestyle = "lifestyle",
    Shopping = "shopping",
    General = "general",
  }
  