import {Restaurant} from "@api/commonTypes/restaurant";

type FoldedRestaurant = {
    reviewCount: number
} & Pick<Restaurant, "id" | "name" | "posterUrl"|"serves_beer" >;

export default function FoldedRestaurantCard({id, name, posterUrl,serves_beer}: FoldedRestaurant) {
    return (
        <a class="flex flex-col p-1 bg-nord-1 m-1 rounded w-1/5 hover:bg-nord-2 min-w-min" key={id}
           href={`/restaurant/${id}`}>
            <img class="rounded shadow-sm" src={posterUrl} alt={`${name} постер`} width="100%" height="auto"/>
            <p class="min-w-min text-center">{name}</p>
            <p className="min-w-min text-center">{serves_beer ? "No BEER:(" : "SERVES BEER:)"}</p>

        </a>
    );
}
