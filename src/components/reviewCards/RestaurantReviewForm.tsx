import { Restaurant } from "@api/commonTypes/restaurant";
import useCreateReviewRequest from "@api/review/createReviewRequest";
import useDeleteReviewRequest from "@api/review/deleteReviewRequest";
import { useGetUserReviewRequest } from "@api/review/getReviewsRequest";
import useUpdateReviewRequest from "@api/review/updateReviewRequest";
import Form from "@components/atomic/form/Form";
import FormButton from "@components/atomic/form/FormButton";
import FormInput from "@components/atomic/form/FormInput";
import FormTexarea from "@components/atomic/form/FormTextarea";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
import { userStore } from "@stores/userStore";
import { useEffect } from "preact/hooks";
import { toast } from "react-toastify";

interface ReviewFormProps extends Pick<Restaurant, "id"> {
  toggleChanged: () => void;
}

export default function RestaurantReviewForm({ id, toggleChanged }: ReviewFormProps) {
  const userId = userStore(state => state?.user?.id);

  const { call: getReview, response: review, setResponse: setReview, isLoading: isGetLoading, isError: isGetError } = useGetUserReviewRequest({ restaurantId: id, userId });

  const { call: createReview, isLoading: isCreateLoading } = useCreateReviewRequest(
    { restaurantId: id, review: review?.success?.review, rating: review?.success?.rating },
    data => { review.success = { ...review.success, ...(data) }; setReview(review); toggleChanged(); toast.success("Review was successfully created"); },
    error => toast.error(error.message),
  );

  const { call: updateReview, isLoading: isUpdateLoading } = useUpdateReviewRequest(
    review?.success?.id,
    { review: review?.success?.review, rating: review?.success?.rating },
    () => { setReview({ ...review }); toggleChanged(); toast.success("Review was successfully updated"); },
    error => toast.error(error.message),
  );

  const { call: deleteReview, isLoading: isDeleteLoading } = useDeleteReviewRequest(
    review?.success?.id,
    () => { setReview({ fail: review.fail, success: null }); toggleChanged(); toast.success("Review was successfully deleted") },
    error => toast.error(error.message),
  );

  useEffect(() => getReview(), [id]);

  function updateReviewText(value: string) {
    review.success = { ...review.success, review: value };
    setReview({ ...review });
  }


  function updateReviewRating(value) {
    review.success = { ...review.success, rating: value };
    setReview({ ...review });
  }

  function onSubmit(event: Event) {
    event.preventDefault();
    switch (((event as SubmitEvent).submitter as HTMLFormElement).name) {
      case "create": createReview(); break;
      case "update": updateReview(); break;
      case "delete": deleteReview(); break;
    }
  }

  if (isGetLoading) return <Loading />;
  if (isGetError && review.fail.statusCode !== 422) return <Error message={review.fail.message} />;

  return (
    <Form onSubmit={onSubmit}>
      <FormTexarea
        value={review?.success?.review ? review.success.review : ""}
        onInput={t => updateReviewText(t.value)}
        placeholder="Leave your review here " maxLength={1000} rows={5}
      />
      <div class="flex flex-row">
        <FormInput
          value={review?.success?.rating ? review.success.rating : ""}
          onInput={t => updateReviewRating(t.value)}
          placeholder="Rating" type="number" min={0} max={5} step={0.1} size={3} w="basis-1/12 text-center placeholder-center"
        />
        <div class="p-0.5" />
        {
          review?.success?.id !== undefined ?
            <>
              <FormButton
                isLoading={isUpdateLoading}
                text="Update"
                name="update"
              />
              <div class="px-0.5" />
              <FormButton
                isLoading={isDeleteLoading}
                text="Delete"
                name="delete"
              />
            </>
            :
            <FormButton
              isLoading={isCreateLoading}
              text="Create"
              name="create"
            />
        }
      </div>
    </Form>
  );
}
