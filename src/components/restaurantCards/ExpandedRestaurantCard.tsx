import {Restaurant} from "@api/commonTypes/restaurant";
import {Review} from "@api/commonTypes/review";
import Card from "@components/atomic/Card"
import RatingTable, {Direction} from "@components/atomic/RatingTable"
import ReviewCard from "@components/reviewCards/ReviewCard"
import trim from "@utils/trim"

type ExpandedRestaurant = {
    reviews: Array<Review>;
} & Restaurant;

export default function ExpandedRestaurantCard({id, name, formatted_address, averageRating, posterUrl, reviews,serves_beer}: ExpandedRestaurant) {
    return (
        <Card
            header={<Header id={id} name={name}/>}
            imageURL={posterUrl}
            imageInfo={<RatingTable averageRating={averageRating} direction={Direction.COLUMN}/>}
        >
            <div className="flex flex-col me-3">
                <div class="mt-1 mb-2">
                    {formatted_address}
                </div>
                <div>
                    {reviews?.map(r =>
                        <ReviewCard {...r} review={trim(r.review)}/>
                    )}
                </div>
                <div className="mt-4 mb-5">
                    {serves_beer ? "No BEER:(" : "Serves Beer:)"}
                </div>
            </div>
        </Card>
    );
}

type HeaderProps = Pick<ExpandedRestaurant, "id" | "name">;

function Header({id, name}: HeaderProps) {
    return (
        <a class="py-1 text-lg rounded-t shadow-sm ps-2 bg-nord-2 hover:text-nord4" href={`/restaurant/${id}`}>
            {name}
        </a>
    );
}

