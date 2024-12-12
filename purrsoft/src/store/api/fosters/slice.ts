import { 
    BaseQueryFn,
    EndpointBuilder, 
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/query";

const fostersTag = 'Fosters';
type TagTypes = typeof fostersTag;

export type Foster = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    startDate: string;
    endDate: string;
    status: string;
    location: string;
    maxAnimalsAllowed: number;
    homeDescription: string;
    experienceLevel: string;
    hasOtherPets: boolean;
    otherAnimalDetails: string;
    animalFosteredCount: number;
    createdAt: string;
    updatedAt: string;
}

export type FostersPaginatedResponse = {
  records: Array<Omit<Foster, 'fosterTags'> & { tags: string[] }>;
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
    getFosters: builder.query<FostersPaginatedResponse, void>({
      providesTags: [fostersTag],  
      query: () => ({
            url: '/Foster',
            method: 'GET'
        }),
    }),
  });