import useApi, {onFailFn, onSuccessFn} from "@api/base/apiHook";
import ApiRequest, {ApiRequestType, Params} from "@api/base/apiRequest";
import {Error} from "@api/commonTypes/error";
import {Restaurant} from "@api/commonTypes/restaurant";

type MovieParams = {
    findKp: boolean;
};

type SuccessResponse = Restaurant;

type FailResponse = Error;

export default function useRestaurantRequest(restaurantId: number,params: MovieParams, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
    return useApi(
        new ApiRequest(`https://restraunt.azurewebsites.net/api/restaurant/${restaurantId}`, ApiRequestType.GET, params as unknown as Params),
        onSuccess,
        onFail
    );
}
