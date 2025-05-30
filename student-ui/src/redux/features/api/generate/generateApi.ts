import { apiSlice } from "../../api/apiSlice";
import { setAssessment } from "../../local-storage/localStorageSlice";


export const generateApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        enhancePrompt: builder.mutation({
            query: ({ prompt }) => ({
                url: "enhance-prompt",
                method: "POST",
                body: { prompt },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // Handle successful response if needed
                } catch (error: any) {
                    console.log(error);
                    // Handle error if needed
                }
            },
        }),
        generateTopics: builder.mutation({
            query: ({ prompt }) => ({
                url: "generate-topics",
                method: "POST",
                body: { prompt },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // Handle successful response if needed
                } catch (error: any) {
                    console.log(error);
                    // Handle error if needed
                }
            },
        }),
        generateAssessment: builder.mutation({
            query: (data) => ({
                url: "generate-assessment",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(setAssessment(result.data)); // Store the assessment data in Redux
                    // Handle successful response if needed
                } catch (error: any) {
                    console.log(error);
                    // Handle error if needed
                }
            },
        }),
        getAssessment : builder.query({
            query: (assessmentId) => ({
                url: `assessment/${assessmentId}`,
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // Handle successful response if needed
                } catch (error: any) {
                    console.log(error);
                    // Handle error if needed
                }
            },
        })
    }),
});

export const {
    useEnhancePromptMutation,
    useGenerateTopicsMutation,
    useGenerateAssessmentMutation,
    useGetAssessmentQuery
} = generateApi;
