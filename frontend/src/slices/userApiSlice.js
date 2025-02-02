// usersApiSlice.js
import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`, // Fixed: changed from /login to /logout
                method: 'POST',
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        getProfile: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile`,
                method: 'GET',
            }),
            providesTags: ['User']
        }),
    })
});

export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useUpdateUserMutation,
    useGetProfileQuery
} = usersApiSlice;
