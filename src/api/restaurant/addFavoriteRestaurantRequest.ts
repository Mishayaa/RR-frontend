import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType, Params } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";
import { Restaurant } from "@api/commonTypes/restaurant";

type FavoriteParams = {
  restaurantId: number,
};

type SuccessResponse = Restaurant;

type FailResponse = Error;

export default function useAddFavoriteRestaurantRequest(params: FavoriteParams, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
  return useApi(
    new ApiRequest("https://restaurant-estim.onrender.com/api/restaurant/favorites", ApiRequestType.POST, params as unknown as Params),
    onSuccess,
    onFail,
    false
  );
}
