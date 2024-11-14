import { 
    BaseQueryFn,
    EndpointBuilder, 
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/query";

export type Animal = {
    id: string;
    animalType: string;
    name: string;
    yearOfBirth: number;
    gander: string;
    sterilized: boolean;
    imageUrl: string;
}

export const endpoints = (
    builder: EndpointBuilder<
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      string,
      'api'
    >,
  ) => ({
    getAnimals: builder.query<Animal[], void>({
        query: () => ({
            url: '/Animal/GetAnimals',
            method: 'GET'
        }),
    }),
  });