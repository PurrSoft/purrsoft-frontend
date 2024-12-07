import { 
    BaseQueryFn,
    EndpointBuilder, 
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/query";

const animalTag = 'Animal';
type TagTypes = typeof animalTag;

export type Animal = {
    id: string;
    animalType: string;
    name: string;
    yearOfBirth: number;
    gender: string;
    sterilized: boolean;
    imageUrl: string;
}

export type AnimalsPaginatedRepsonse = {
  records: Array<Omit<Animal, 'animalTags'> & { tags: string[] }>;
  totalNumbersOfRecords: number;
}

export const endpoints = <Tags extends string> (
    builder: EndpointBuilder<
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      Tags | TagTypes,
      'api'
    >,
  ) => ({
    getAnimals: builder.query<AnimalsPaginatedRepsonse, void>({
      providesTags: [animalTag],  
      query: () => ({
            url: '/Animal',
            method: 'GET'
        }),
    }),
  });