export type APISuccessResponse<ResponseData = void> = {
  message: string;
  data: ResponseData;
};

export type Account = {
  accountNumber: string;
  balance: number;
  currency: string; // NGN
  id: string;
  name: string;
  type: string; // savings_account
  institution: {
    bankCode: string;
    name: string;
    type: string; // PERSONAL_BANKING
  };
  meta: Record<sting, string>;
};

export type Transaction = {
  amount: number;
  balance: number;
  currency: string;
  date: Date | string;
  narration: string;
  type: string; // 'debit' | 'credit'
  _id: string;
};
