export const handleCommentSubmit = async (
    offerId: string,
    comment: string,
    rating: number,
    e: FormEvent,
    dispatch: AppDispatch,
    setComment: (value: string) => void,
    setRating: (value: number) => void,
    setIsSubmitting: (value: boolean) => void,
) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(postComment({ offerId, comment, rating }));
    setComment('');
    setRating(0);
    setIsSubmitting(false);
};