export const apiErrorToString = (err: any): string => {
    if (err.response.data.message) {
        return err.response.data.message;
    }
    return JSON.stringify(err.response.data);
};