import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType, Params } from "@api/base/apiRequest";
import { PageParams } from "@api/commonParams/page";
import { Error } from "@api/commonTypes/error";
import { Restaurant } from "@api/commonTypes/restaurant";
import { Pages } from "@api/commonTypes/pages";
import { Review } from "@api/commonTypes/review";

type SearchParams = {
  name: string,
  expanded?: boolean,
  findKp?: boolean
} & PageParams;

type ExpandedRestaurant = {
  reviews: Array<Review>;
} & Restaurant;

type SuccessResponse = {
  restaurants: Array<ExpandedRestaurant>,
} & Pages;

type FailResponse = Error;

export default function useRestaurantSearchRequest(params: SearchParams, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
  return useApi(new ApiRequest("/api/restaurant/search", ApiRequestType.GET, params as unknown as Params), onSuccess, onFail);
}
