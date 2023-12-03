import Card from "@components/atomic/Card"
import RatingTable from "@components/atomic/RatingTable"
import {Restaurant} from "@api/commonTypes/restaurant";
import useAddFavoriteRestaurantRequest from "@api/restaurant/addFavoriteRestaurantRequest";
import {toast} from "react-toastify";
import {useState} from "preact/hooks";
import useRemoveFavoriteRestaurantRequest from "@api/restaurant/removeFaviriteRestaurantRequest";

export default function RestaurantCard({
                                           id,
                                           name,
                                           formatted_address,
                                           averageRating,
                                           posterUrl,
                                           isFavorite,
                                           serves_beer
                                       }: Restaurant) {
    return (
        <Card
            header={<Header name={name}/>}
            imageURL={posterUrl}
            imageInfo={<ImageFooter id={id} isFavorite={isFavorite}/>}
        >
            <div className="flex flex-col h-full">
                <div class="ps-1">{formatted_address}</div>
                <div class="p-1 h-full"></div>
                <div className="ps-2">{serves_beer}</div>
                <RatingTable averageRating={averageRating}/>
            </div>

        </Card>
    );
}

type HeaderProps = Pick<Restaurant, "name">;

function Header({name}: HeaderProps) {
    return (
        <div class="flex flex-row w-full text-lg">
            <p class="basis-1/2 ms-1">
                {name}
            </p>
        </div>
    );
}

type ImageFooterProps = Pick<Restaurant, "id" | "isFavorite">;

function ImageFooter({id, isFavorite}: ImageFooterProps) {
    const [favorite, setFavorite] = useState(isFavorite);

    const {call: addFavorite} = useAddFavoriteRestaurantRequest(
        {restaurantId: id},
        () => {
            setFavorite(true);
            toast.success("Restaurant added to the favorites");
        },
        error => toast.error(error.message),
    );

    const {call: removeFavorite} = useRemoveFavoriteRestaurantRequest(
        {restaurantId: id},
        () => {
            setFavorite(false);
            toast.success("Restaurant deleted to the favorites");
        },
        error => toast.error(error.message),
    );

    return (
        <div class="flex flex-row gap-1">
            <button class="min-w-min px-1 rounded shadow-sm bg-nord2 hover:bg-nord3"
                    onClick={() => favorite ? removeFavorite() : addFavorite()}>
                {favorite ? "⭐" : " ✰ "}
            </button>

        </div>
    );
}
