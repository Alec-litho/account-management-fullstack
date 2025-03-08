import { defineStore } from "pinia";
import axios from "axios";

export const useAccountStore = defineStore("accounts", {
  state: () => ({
    currentAccount: null as StoredAccount | null,
    jwtToken: "",
    accounts: [] as StoredAccount[],
    rememberUser: false,
  }),

  actions: {
    async createAccount(newAccount: CreateAccountData) {
      try {
        // Send request to backend
        const response = await axios.post(
          "http://localhost:3000/auth/register",
          {
            login: newAccount.login,
            password: newAccount.password,
            tabNumber: newAccount.tabNumber,
          }
        );
        console.log(response, response.data);
        const { account, accessToken } = response.data;
        // call function which extracts password to save it in store and localstorage
        const accountLs = this.createAccountWithoutPassword(account);
        this.rememberUser
          ? this.storeToLocalStorage(accountLs, accessToken)
          : null;
        // Save data to store
        this.jwtToken = accessToken;
        this.currentAccount = accountLs;
        this.rememberUser = false;
        return accountLs;
      } catch (error) {
        console.error("Account creation failed:", error);
        alert("Account logging failed:");
      }
    },
    async login(password: string, id: string) {
      try {
        const result = await axios.post("http://localhost:3000/auth/login", {
          id,
          password,
        });
        const accountLs = this.createAccountWithoutPassword(result.data);
        console.log(result);
        this.currentAccount = accountLs;
      } catch (error) {
        console.error("Account logging failed:", error);
        alert("Account logging failed:");
      }
    },
    createAccountWithoutPassword(account: ERPAccount): StoredAccount {
      return {
        id: account.id,
        fullName: account.fullName,
        login: account.login,
        tabNumber: account.tabNumber,
      };
    },
    storeToLocalStorage(accountLs: StoredAccount, token: string) {
      //get stored accounts if exist
      const storedAccounts = localStorage.getItem("accounts")
        ? localStorage.getItem("accounts")
        : "[]";
      // Save to localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem(
        "accounts",
        JSON.stringify([
          ...(JSON.parse(storedAccounts as string) as []),
          accountLs,
        ])
      );
    },
    loadFromLocalStorage() {
      const token = localStorage.getItem("jwtToken");
      if (token) this.jwtToken = token;

      const account = localStorage.getItem("currentAccount");
      if (account) this.currentAccount = JSON.parse(account);

      const allAccounts = localStorage.getItem("accounts");
      if (allAccounts) this.accounts = JSON.parse(allAccounts);
    },
    setRemember(value: boolean) {
      this.rememberUser = value;
    },
  },
  getters: {
    getAccounts: (state): StoredAccount[] | [] => {
      return state.accounts;
    },
  },
});
