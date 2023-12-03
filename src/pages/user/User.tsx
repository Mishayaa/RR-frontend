import useGetUserRequest from "@api/user/getUserRequest";
import UserFavoriteRestaurantList from "@components/restaurantCards/UserFavoriteRestaurantList";
import UserReviewList from "@components/reviewCards/UserReviewList";
import ExpandedUserCard from "@components/userCards/ExpandedUserCard";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
import { userStore } from "@stores/userStore";
import { useEffect, useState } from "preact/hooks";


interface UserProps {
  id: number;
}

export default function User({ id }: UserProps) {
  const currentUserId = userStore(state => state?.user?.id);
  const [isReviewState, setReviewState] = useState(true);
  const { call, response, isLoading, isError } = useGetUserRequest(
    id, () => { }, () => { },
  );

  useEffect(() => call(), [id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error message={response?.fail?.message} />;

  return (
    <div>
      {currentUserId === Number(id) ? <a class="flex rounded bg-nord1 hover:bg-nord2 w-full p-1 mb-1 justify-center" href={`/userSettings/${id}`}>Редактировать профиль</a> : null}
      <ExpandedUserCard {...response.success} />
      <div class="flex flex-row my-1 gap-1">
        <button class="px-1 bg-nord1 hover:bg-nord2 disabled:bg-nord0 disabled:text-nord1 w-1/2 rounded" disabled={isReviewState} onClick={() => setReviewState(true)}>
          Отзывы
        </button>
        <button class="px-1 bg-nord1 hover:bg-nord2 disabled:bg-nord0 disabled:text-nord1 w-1/2 rounded" disabled={!isReviewState} onClick={() => setReviewState(false)}>
          Избранное
        </button>
      </div>
      {isReviewState ?
        <UserReviewList id={id} /> :
        <UserFavoriteRestaurantList id={id} />
      }
    </div>
  );
}


