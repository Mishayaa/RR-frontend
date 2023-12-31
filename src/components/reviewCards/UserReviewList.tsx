import { Restaurant } from "@api/commonTypes/restaurant";
import useGetReviewsRequest from "@api/review/getReviewsRequest";
import Paginator from "@components/atomic/Paginator";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
import { useEffect, useState } from "preact/hooks";
import { toast } from "react-toastify";
import ReviewCard from "./ReviewCard";
import useUserRestaurantsRequest from "@api/restaurant/userRestaurantsRequest";
import ExpandedRestaurantCard from "@components/restaurantCards/ExpandedRestaurantCard";
import ExpandedReviewCard from "@components/reviewCards/ExpandedReviewCard";

interface UserReviewListProps {
  id: number;
}

export default function UserReviewList({ id }: UserReviewListProps) {
  const [page, setPage] = useState(1);
  const { call, response, isLoading, isError } = useUserRestaurantsRequest(
      id, { page }, () => { },
      error => toast.error(error.message)
  );


  useEffect(() => call(), [page, id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error message={response.fail.message} />;

  return (
      <div class="mt-1">
        {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
        {response.success.restaurants.map(r => <ExpandedReviewCard {...r} />)}
        {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
      </div>
  );
}