import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType, Params } from "@api/base/apiRequest";
import { PageParams } from "@api/commonParams/page";
import { Error } from "@api/commonTypes/error";
import { Restaurant } from "@api/commonTypes/restaurant";
import { Pages } from "@api/commonTypes/pages";
import { User } from "@api/commonTypes/user";

type UserRestaurantParams = PageParams;

type ExpandedRestaurant = {
  rating: number,
  review: string,
} & Restaurant;

type SuccessResponse = {
  user: User,
  restaurants: Array<ExpandedRestaurant>,
} & Pages;

type FailResponse = Error;

export default function useUserRestaurantsRequest(userId: number, params: UserRestaurantParams, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
  return useApi(new ApiRequest(`https://restraunt.azurewebsites.net/api/restaurant/user/${userId}`, ApiRequestType.GET, params as unknown as Params), onSuccess, onFail);
}
