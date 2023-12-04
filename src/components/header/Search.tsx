import useRestaurantSearchRequest from "@api/restaurant/restaurantSearchRequest";
import useRandomTitleRequest from "@api/restaurant/randomTitleRequest";
import {useEffect, useState} from "preact/hooks";
import {toast} from "react-toastify";

export default function Search() {
    const [randomRestaurant, setRandomRestaurant] = useState({id: 0, name: ""});
    const [searchState, setSearchState] = useState({value: "", results: [], searched: false});

    const {call: callSearch} = useRestaurantSearchRequest(
        {name: searchState.value, page: 1},
        data => setSearchState({...searchState, results: data.restaurants}),
        error => toast.error(error.message),
    );

    const {call: callRandomTitle} = useRandomTitleRequest(
        data => setRandomRestaurant(data[Math.floor(Math.random() * data.length)]),
        error => toast.error(error.message),
    );

    useEffect(() => callRandomTitle(), [searchState.results]);

    useEffect(() => {
        const delayedSearch = setTimeout(() => searchState?.value?.length !== undefined && searchState.value.length !== 0 && callSearch(), 600);
        return () => clearTimeout(delayedSearch);
    }, [searchState.value])

    function onEnter() {
        if ((!searchState.value || searchState.value.length === 0) && randomRestaurant?.id !== undefined) {
            window.location.href = `/search/${encodeURI(searchState.value)}`;
            //window.location.href = `/restaurant/${randomRestaurant.id}`;

        } else {
            window.location.href = `/restaurant/${randomRestaurant.id}`;
            window.location.href = `/search/${encodeURI(searchState.value)}`;

        }
    }

    return (
        <div class="m-auto w-full">
            <input
                class="p-1 w-full text-center rounded bg-nord2 placeholder:text-center placeholder:text-nord9 hover:bg-nord3 focus:bg-nord3 focus:outline-none"
                type="text"
                placeholder={randomRestaurant?.name !== undefined ? `Lets search... ${randomRestaurant.name}?` : "Search"}
                value={searchState.value}
                onInput={(e) => setSearchState({...searchState, value: (e.target as HTMLInputElement).value})}
                onFocus={() => setSearchState({...searchState, searched: true})}
                onKeyDown={(e) => e.key == "Enter" && onEnter()}
            />
            {searchState.searched &&
                <div class="absolute bottom-0 left-0 top-0 w-full h-max"
                     onClick={() => setSearchState({...searchState, searched: false})}>
                    <div class="flex pt-12 flex-col h-screen bg-origin-content bg-black/10">
                        <div class="flex flex-col mx-auto w-4/6">
                            <ul>
                                {searchState.results.map(m => <SearchCard {...m} />)}
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

interface SearchCardProps {
    id: number;
    name: string;
}

function SearchCard({id, name}: SearchCardProps) {
    return (
        <li class="bg-nord2 hover:bg-nord3 first:rounded-t first:mt-1 last:rounded-b py-0.5" key={id}>
            <a class="flex flex-row mx-2" href={`/restaurant/${id}`}>
                {name}
            </a>
        </li>
    );
}

