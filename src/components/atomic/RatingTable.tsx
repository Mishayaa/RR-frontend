import ColoredRating, {TextSize} from "./ColoredRating";

export enum Direction {
    ROW,
    COLUMN
}

interface RatingTableProps {
    averageRating: number;

    direction?: Direction;
}

export default function RatingTable({averageRating, direction = Direction.ROW}: RatingTableProps) {
    return (
        <div
            className={`flex flex-${direction === Direction.ROW ? "row" : "col"} justify-items-center bg-nord2 rounded ${direction === Direction.ROW ? "mx-1" : ""} shadow-sm`}>
            <Rating direction={direction} symbol="💩" rating={averageRating} name="Rating"/>
        </div>
    );
}

interface RatingProps {
    direction: Direction;
    symbol: string;
    rating: number;
    name: string;
}

function Rating({direction, symbol, rating, name}: RatingProps) {
    return (
        <div name={name}
             className={`flex flex-row justify-start gap-2 mx-1 ${direction === Direction.ROW ? "py-0.5" : ""} hover:cursor-default`}>
            <p class="text-lg">{symbol}</p>
            <ColoredRating rating={rating} textSize={TextSize.TEXT_LG}/>
        </div>
    );
}
