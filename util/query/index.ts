import { Query, QueryKey } from "@tanstack/react-query";
import { logger } from "@/util/logger";
import { QueryTextProps, capitalize, errorText } from "@/util/text";
import { ErrorValue, QueryErrCodes, QueryKeys } from "@/models/query";
import { errorToast } from "@/util/toast";

interface QueryCacheOnError {
  message: string | undefined | null;
  query: Query<unknown, unknown, unknown, QueryKey>;
}

export function queryCacheOnError({ message, query }: QueryCacheOnError) {
  switch (query.meta?.errCode) {
    case QueryErrCodes.GetCurrentUser:
      errorToast({
        message: message ?? QueryErrCodes.GetCurrentUser,
        title: QueryKeys.Get_User,
      });
      break;

break
    default:
      errorToast({
        message: message ?? "Something went wrong. Please try again later",
        title: "Error",
      });
      break;
  }
}

export interface QueryKeysProps {
  key: string;
  other?: string;
}

export function queryKeyWithProps({ key, other }: QueryKeysProps) {
  const queryKeys = [key];

  if (other) {
    queryKeys.push(other);
  }

  return queryKeys;
}

interface Props extends QueryTextProps {
  error: ErrorValue;
  desc: string;
  title: string;
}

export const queryErrorMessage = (error: ErrorValue) => {
  if (!error) return;
  const message = error?.message;
  logger("query error message", error.message);
  return message ? capitalize(message) : undefined;
};

export const queryOnError = ({
  error,
  desc,
  isDelete,
  isEdit,
  title,
}: Props) => {
  const message = queryErrorMessage(error);
  errorToast({
    message: message ?? `${errorText({ isEdit, isDelete })} ${desc}`,
    title,
  });
};
