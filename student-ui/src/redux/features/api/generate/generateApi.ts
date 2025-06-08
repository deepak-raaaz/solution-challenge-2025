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
        getAssessment: builder.query({
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
        }),
        getPlaylistById: builder.query({
            query: (playlistId) => ({
                url: `playlists/${playlistId}`,
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
        }),
        submitAssessment: builder.mutation({
            query: ({ assessmentId, userAnswers }) => ({
                url: `assessment-submit/${assessmentId}`,
                method: "PUT",
                body: { userAnswers },
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
        generatePlaylist: builder.mutation({
            query: (data) => ({
                url: "create-playlist",
                method: "POST",
                body: data,
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
        generateThumbnail: builder.mutation({
            query: ({ playlistId }) => ({
                url: `playlist-thumbnail-generate/${playlistId}`,
                method: "PUT",
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
        publishPlaylist: builder.mutation({
            query: ({ playlistId, modulePublished }) => ({
                url: `publish-playlist/${playlistId}`,
                method: "PUT",
                body: { modulePublished },
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
        getAllPlaylists: builder.query({
            query: (params) => ({
                url: "playlists",
                method: "GET",
                params: {
                    page: params.page,
                    limit: params.limit,
                    search: params.search,
                    level: params.level,
                    resourceType: params.resourceType,
                    platforms: params.platforms,
                    tags: params.tags,
                    sortBy: params.sortBy,
                    sortOrder: params.sortOrder,
                },
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

        generateRoadmap: builder.mutation({
            query: (data) => ({
                url: "create-learning-roadmap",
                method: "POST",
                body: data,
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
        learningRoadmap: builder.query({
            query: (roadmapId) => ({
                url: `learning-roadmap/${roadmapId}`,
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
        }),
        learningResource: builder.query({
            query: (resourceId) => ({
                url: `learning-roadmap/resource/${resourceId}`,
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
        }),
        getQuiz: builder.query({
            query: (quizId) => ({
                url: `learning-roadmap/quiz/${quizId}`,
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
        }),
        submitQuiz: builder.mutation({
            query: ({ quizId, answers }) => ({
                url: `learning-roadmap/submit-quiz/${quizId}`,
                method: "PUT",
                body: { answers },
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
        completeMark: builder.mutation({
            query: ({ resourceId }) => ({
                url: `learning-roadmap/resource/completed/${resourceId}`,
                method: "PUT",
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
        createNewResource: builder.mutation({
            query: ({ lessonId, resourceType }) => ({
                url: `learning-roadmap/new-resource/${lessonId}`,
                method: "PUT",
                body: { resourceType },
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
        createReAttemptQuiz: builder.mutation({
            query: ({ data }) => ({
                url: `learning-roadmap/create-reattempt-new-quiz`,
                method: "PUT",
                body: data,
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
        myRoadmap:builder.query({
            query: () => ({
                url: `my-learning-roadmap`,
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
    useGetAssessmentQuery,
    useGetPlaylistByIdQuery,
    useSubmitAssessmentMutation,
    useGeneratePlaylistMutation,
    useGenerateThumbnailMutation,
    usePublishPlaylistMutation,
    useGetAllPlaylistsQuery,
    useLearningRoadmapQuery,
    useLearningResourceQuery,
    useGetQuizQuery,
    useSubmitQuizMutation,
    useCompleteMarkMutation,
    useCreateReAttemptQuizMutation,
    useCreateNewResourceMutation,
    useGenerateRoadmapMutation,
    useMyRoadmapQuery
} = generateApi;
