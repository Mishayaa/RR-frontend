import {Review} from "@api/commonTypes/review";
import Card from "@components/atomic/Card"
import ColoredRating from "@components/atomic/ColoredRating"
import markdownSettings from "@utils/markdownSettings";
import ReactMarkdown from "react-markdown";

type ReviewCardProps = {
    name: string;
    posterUrl: string;
    averageRating: number;
} & Omit<Review, "user" | "restaurantId">;

export default function ExpandedReviewCard({
                                               id,
                                               name,
                                               posterUrl,
                                               averageRating,
                                               rating,
                                               review
                                           }: ReviewCardProps) {
    return (
        <Card header={<Header id={id} name={name} averageRating={averageRating} rating={rating} />}
              imageURL={posterUrl}>
            <ReactMarkdown components={markdownSettings}>
                {review}
            </ReactMarkdown>
        </Card>
    );
}

type HeaderProps = Omit<ReviewCardProps, "review" | "posterUrl">;

function Header({id, name, averageRating, rating}: HeaderProps) {
    return (
        <a class="flex flex-row p-1 rounded-t bg-nord2 hover:text-nord4" href={`/restaurant/${id}`}>
            {name} (<Rating rating={rating} averageRating={averageRating}/>)
        </a>
    );
}

type RatingProps = Pick<HeaderProps, "rating" | "averageRating">;

function Rating({rating, averageRating}: RatingProps) {
    return (
        <p class="flex flex-row gap-1">
            <ColoredRating rating={rating}/>
            {averageRating !== null && (<p>|</p>)}
            {averageRating !== null && (<ColoredRating rating={averageRating}/>)}
        </p>
    );
}

