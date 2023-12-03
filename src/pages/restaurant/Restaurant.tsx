import useRestaurantRequest from "@api/restaurant/restaurantRequest";
import RestaurantCard from "@components/restaurantCards/RestaurantCard";
import RestaurantReviewForm from "@components/reviewCards/RestaurantReviewForm";
import RestaurantReviewList from "@components/reviewCards/RestaurantReviewList";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
import { useState, useEffect } from "preact/hooks";

interface RestaurantProps {
  id:number
}

export default function Restaurant({ id }: RestaurantProps) {
  const [changed, setChanged] = useState(false);
  const [findKp, setFindKp] = useState(false);
  const { call, response, isLoading, isError } = useRestaurantRequest(id, { findKp } );

  useEffect(() => call(), [id, findKp]);

  if (isLoading) return <Loading />;
  if (isError && !findKp && response.fail.statusCode === 422) setFindKp(true);
  if (isError) return <Error message={response.fail.message} />;

  return (
    <div class="flex flex-col">
      <RestaurantCard {...response.success} />
      <RestaurantReviewForm id={id} toggleChanged={() => setChanged(!changed)} />
      <RestaurantReviewList id={id} changed={changed} />
    </div>
  );
}

