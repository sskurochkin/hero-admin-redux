import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api', //название редьюсера 
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),//базовый адрес запроса
    tagTypes: ['Heroes'],// свзь между запросами
    endpoints: builder => ({
        getHeroes: builder.query({ //без изменений
            query:() => '/heroes',
            providesTags: ['Heroes'],//связь
        }),
        createHero: builder.mutation({ //меняющийся
            query: hero => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Heroes']//связь
        }),
        deleteHero: builder.mutation({
            query: id=>({
                url: `/heroes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Heroes']
        })
    })  //операции которые будут проводиться по базовому адресу
})


export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice 