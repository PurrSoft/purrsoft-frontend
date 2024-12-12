import { 
    BaseQueryFn,
    EndpointBuilder, 
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/query";

const volunteerTag = 'Volunteer';
type TagTypes = typeof volunteerTag;

export type Volunteer = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    tier: string;
}

export type VolunteersPaginatedResponse = {
  records: Array<Omit<Volunteer, 'volunteerTags'> & { tags: string[] }>;
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
    getVolunteers: builder.query<VolunteersPaginatedResponse, void>({
      providesTags: [volunteerTag],  
      query: () => ({
            url: '/Volunteer',
            method: 'GET'
        }),
    }),
  });