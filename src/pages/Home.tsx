import usePopularTitleRequest from "@api/restaurant/popularRestaurantRequest";
import { useEffect } from "preact/hooks";
import { toast } from "react-toastify";
import Loading from "./Loading";
import Error from "./Error";
import FoldedRestaurantCard from "@components/restaurantCards/FoldedRestaurantCard";

export default function Home() {
  return (
    <div>
      <div>
        <p class="text-2xl text-center">Restaurant rate</p>
        <p class="text-sm text-nord3 text-center"></p>
      </div>
      <PopularRestaurants />
    </div>
  );
}

function PopularRestaurants() {
  const { call, response, isLoading, isError } = usePopularTitleRequest(() => { }, error => toast.error(error.message));

  useEffect(() => isLoading && call(), [isLoading]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div class="flex flex-row flex-wrap justify-center">
      {response.success.map(r => <FoldedRestaurantCard {...r} />)}
    </div>
  );
}

