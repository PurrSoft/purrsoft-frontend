import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';

const volunteerTag = 'Volunteer';
type TagTypes = typeof volunteerTag;

export type Volunteer = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  tier: string;
};
type GetVolunteersEndpointParams = Partial<{
  Skip: number;
  Take: number;
  SortBy: string;
  SortOrder: string;
  Search: string;
  Status: string;
  Tier: string;
  'User.UserId': string;
}>;
export type VolunteersPaginatedResponse = {
  records: Array<Omit<Volunteer, 'volunteerTags'> & { tags: string[] }>;
  totalNumbersOfRecords: number;
};

export const endpoints = <Tags extends string>(
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
      method: 'GET',
    }),
  }),
  getVolunteersPaginated: builder.query<
    VolunteersPaginatedResponse,
    GetVolunteersEndpointParams
  >({
    providesTags: [volunteerTag],
    query: (params: GetVolunteersEndpointParams) => ({
      url: '/Volunteer',
      method: 'GET',
      params,
    }),
  }),
});
