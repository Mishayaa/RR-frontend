import useRestaurantSearchRequest from "@api/restaurant/restaurantSearchRequest";
import Paginator from "@components/atomic/Paginator";
import ExpandedRestaurantCard from "@components/restaurantCards/ExpandedRestaurantCard";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
import { useEffect, useState } from "preact/hooks"

interface TitleSearchProps {
  name: string;
}

export default function TitleSearch({ name }: TitleSearchProps) {
  const [page, setPage] = useState(1);
  const [findKp, setFindKp] = useState(false);
  const { call, response, isLoading, isError } = useRestaurantSearchRequest({name, page,findKp, expanded: true}, data => {
    console.debug("request done");
    setFindKp(true);

  });

  function search() {
    if (isError) return;
    call();
  }

  useEffect(() => search(), [name, page]);

  if (isLoading || (!isLoading && !isError && response.success?.restaurants?.length === 0)) return <Loading />;
  if (isError) return <Error message={response.fail.message} />

  return (
    <div class="flex flex-col gap-1">
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
      {response.success.restaurants.map(m => <ExpandedRestaurantCard {...m} />)}
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
    </div>
  );
}
