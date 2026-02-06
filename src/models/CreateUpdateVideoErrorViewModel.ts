type TError = {
    /**
     * Error message
     */
    message: string | null;

    /**
     * Field name related to the error
     */
    field: string | null;
};

export type CreateUpdateVideoErrorViewModel = {
    /**
     * List of validation error messages
     */
    errorsMessages: TError[] | null;
};
