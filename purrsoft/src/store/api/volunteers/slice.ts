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

export type VolunteerDto = {
  userId: string;
  startDate: string;
  endDate?: string;
  status: string;
  tier: string;
  lastShiftDate?: string;
  tasks?: string[];
  availableHours: string;
  trainingStartDate?: string;
  supervisorId?: string;
  trainersId?: string[];
}

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
  getVolunteer: builder.query<VolunteerDto, string>({
    providesTags: [volunteerTag],
    query: (id) => ({
      url: `/Volunteer/${id}`,
      method: 'GET',
    }),
  }),
  deleteVolunteer: builder.mutation<void, string>({
    invalidatesTags: [volunteerTag],
    query: (id) => ({
      url: `/Volunteer/${id}`,
      method: 'DELETE',
    }),
  }),
  updateVolunteer: builder.mutation<void, VolunteerDto>({
    invalidatesTags: [volunteerTag],
    query: (volunteer) => ({
      url: `/Volunteer`,
      method: 'PUT',
      body: {
        volunteerDto: {
          userId: volunteer.userId,
          startDate: volunteer.startDate,
          endDate: volunteer.endDate,
          status: volunteer.status,
          tier: volunteer.tier,
          lastShiftDate: volunteer.lastShiftDate,
          tasks: volunteer.tasks,
          availableHours: volunteer.availableHours,
          trainingStartDate: volunteer.trainingStartDate,
          supervisorId: volunteer.supervisorId,
          trainersId: volunteer.trainersId,
        },
      },
    }),
  }),
});
