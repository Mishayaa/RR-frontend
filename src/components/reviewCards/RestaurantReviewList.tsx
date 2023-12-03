import { Restaurant } from "@api/commonTypes/restaurant";
import useGetReviewsRequest from "@api/review/getReviewsRequest";
import Paginator from "@components/atomic/Paginator";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
import { useEffect, useState } from "preact/hooks";
import { toast } from "react-toastify";
import ReviewCard from "./ReviewCard";

interface ReviewListProps extends Pick<Restaurant, "id"> {
  changed: boolean;
}

export default function RestaurantReviewList({ id, changed }: ReviewListProps) {
  const [page, setPage] = useState(1);
  const { call, response, isLoading, isError } = useGetReviewsRequest(
      { restaurantId: id, page },
      () => { },
      error => toast.error(error?.message),
  );

  useEffect(() => {
    if (id) {
      call();
    }
  }, [page, changed]);

  if (isLoading) return <Loading />;
  if (isError || !response?.success) return <Error message={response?.fail?.message} />;

  return (
      <div class="mt-1">
        {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
        {response.success.reviews?.map(r => <ReviewCard {...r} />)}
        {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
      </div>
  );
}
