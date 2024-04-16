export interface RootState {
    auth: {
      timeoutId?: any;
      isLoggedIn?: boolean;
      isError?: boolean;
      errorMessage?: string;
    };
    // Add other reducers and their state types if needed
  }