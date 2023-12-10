import { generateApiHook } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType } from "@api/base/apiRequest";

type PopularRestaurant = {
  id: number,
  name: string,
  placeId:string,
  posterUrl: string,
  reviewCount: number;
  serves_beer:boolean;
};

type SuccessResponse = Array<PopularRestaurant>;
type FailResponse = Error;

const usePopularTitleRequest = generateApiHook<SuccessResponse, FailResponse>(new ApiRequest("https://restaurant-estim.onrender.com/api/restaurant/popular", ApiRequestType.GET));
export default usePopularTitleRequest;
