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
    deleteAnimal: builder.mutation<void, string>({
      invalidatesTags: [animalTag],
      query: (id) => ({
        url: `/Animal/${id}`,
        method: 'DELETE'
      }),
    }),
    updateAnimal: builder.mutation<void, Animal>({
      invalidatesTags: [animalTag],
      query: (animal) => ({
        url: `/Animal`,
        method: 'PUT',
        body: {
          animalDto: {
            id: animal.id,
            animalType: animal.animalType,
            name: animal.name,
            yearOfBirth: animal.yearOfBirth,
            gender: animal.gender,
            sterilized: animal.sterilized,
            imageUrl: animal.imageUrl
          }
        }
      }),
    }),
  });