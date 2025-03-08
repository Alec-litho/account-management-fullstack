interface ERPAccount {
  id: string;
  fullName: string;
  password: string;
  tabNumber: string;
  login: string;
}

interface FormState {
  tabNumber: string;
  login: string;
  password: string;
}

interface FormErrors {
  tabNumber: string;
  login: string;
  password: string;
}

interface StoredAccount extends Omit<ERPAccount, "password"> {}
interface CreateAccountData extends Omit<ERPAccount, "id" | "fullName"> {}
