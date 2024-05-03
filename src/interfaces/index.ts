export interface IRegisterInput {
    name: "email" | "name" | "password";
    placeholder: string;
    type: string;
    validation: {
      required?: boolean;
      minLength?: number;
      pattern?: RegExp;
    };
  }
  
  export interface ILoginInput {
    name: "email" | "password";
    placeholder: string;
    type: string;
    validation: {
      required?: boolean;
      minLength?: number;
      pattern?: RegExp;
    };
  }
  
  export interface IErrorResponse {
    error: {
      details?: {
        errors: {
          message: string;
        }[];
      };
      message?: string;
    };
  }
  
  export interface ITodo {
    id: number;
    title: string;
    description: string;
  }
  