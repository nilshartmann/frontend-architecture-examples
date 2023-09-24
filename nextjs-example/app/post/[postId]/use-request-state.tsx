import { useCallback, useState } from "react";

type ResponseState<ApiResponseType> =
  | {
      isLoading?: false;
      isSuccess?: false;
      isError?: false;
    }
  | {
      isLoading: true;
      isSuccess?: false;
      isError?: false;
    }
  | {
      isLoading?: false;
      isError?: false;
      isSuccess: true;
      data: ApiResponseType;
    }
  | {
      isError: true;
      isLoading?: false;
      isSuccess?: false;
      err: unknown;
    };

const emptyState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
} as const;

export function useRequestState<ApiResponseType>() {
  const [state, setState] =
    useState<ResponseState<ApiResponseType>>(emptyState);

  const requestStarted = useCallback(
    () =>
      setState({
        isLoading: true,
      }),
    [],
  );

  const requestSucceed = useCallback(
    (result: ApiResponseType) =>
      setState({
        isSuccess: true,
        data: result,
      }),
    [],
  );

  const requestFailed = useCallback(
    (err: unknown) =>
      setState({
        isError: true,
        err,
      }),
    [],
  );

  const reset = useCallback(() => setState(emptyState), []);

  return {
    state,
    requestStarted,
    requestSucceed,
    requestFailed,
    reset,
  } as const;
}
