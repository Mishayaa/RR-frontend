import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";
import { User } from "@api/commonTypes/user";

type SuccessResponse = User;
type FailResponse = Error;

export default function useGetUserRequest(userId: number, onSuccess?: onSuccessFn<SuccessResponse>, onFail?: onFailFn<FailResponse>) {
  return useApi(
    new ApiRequest(`https://restaurant-estim.onrender.com/api/users/${userId}`, ApiRequestType.GET),
    onSuccess,
    onFail,
  );
}
