import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType, Params } from "@api/base/apiRequest";
import { PageParams } from "@api/commonParams/page";
import { Error } from "@api/commonTypes/error";
import { Restaurant } from "@api/commonTypes/restaurant";
import { Pages } from "@api/commonTypes/pages";

type FavoriteParams = {
  userId: number,
} & PageParams;

type SuccessResponse = {
  restaurants: Array<Restaurant>,
} & Pages;

type FailResponse = Error;

export default function useGetFavoriteRestaurantsRequest(params: FavoriteParams, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
  return useApi(
    new ApiRequest("https://restaurant-estim.onrender.com/api/restaurant/favorites", ApiRequestType.GET, params as unknown as Params),
    onSuccess,
    onFail
  );
}
