export {};

declare global {
  interface Window {
    netlifyIdentity: NetlifyIdentity;
  }
}

interface NetlifyIdentity {
    init: (options?: InitOptions) => void;
    on: (event: string, callback: (...args: any[]) => void) => void;
    open: () => void;
    close: () => void;
    logout: () => void;
    currentUser: () => User | null;
    // Add other methods and properties as needed
  }
  
  interface InitOptions {
    // Define options if needed
  }
  
  interface User {
    // Define user properties
    token: {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token: string;
      expires_at: string;
    };
    // Add other user properties as needed
  }

export declare type Params<P> = { [key in keyof P]: string }
export declare type PageProps<
    P extends Params<P>,
    SP extends Params<SP>
> = {
    params: P
    searchParams: SP
}