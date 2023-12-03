import { generateApiHook } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";

type RandomTitle = {
  id: number,
  name: string,
};

type SuccessResponse = Array<RandomTitle>;
type FailResponse = Error;

const useRandomTitleRequest = generateApiHook<SuccessResponse, FailResponse>(new ApiRequest("/api/restaurant/restaurantsNames", ApiRequestType.GET, {}, null, true));
export default useRandomTitleRequest;
