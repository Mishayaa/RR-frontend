import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType, Params } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";

type FavoriteParams = {
  restaurantId: number,
};

type SuccessResponse = null;

type FailResponse = Error;

export default function useRemoveFavoriteRestaurantRequest(params: FavoriteParams, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
  return useApi(
    new ApiRequest("https://restraunt.azurewebsites.net/api/restaurant/favorites", ApiRequestType.DELETE, params as unknown as Params),
    onSuccess,
    onFail
  );
}
