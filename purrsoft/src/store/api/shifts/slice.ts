import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';

const shiftTag = 'Shift';
type TagTypes = typeof shiftTag;

//shifttype can be day or night
export type ShiftType = 'Day' | 'Night';

type ShiftOverview = {
  id: string;
  start: string;
  shiftType: ShiftType;
  volunteerId: string;
};

type Shift = {
  id?: string;
  start: string;
  shiftType: ShiftType;
  volunteerId: string;
};

type GetShiftsEndpointParams = Partial<{
  Skip: number;
  Take: number;
  SortBy: string;
  SortOrder: string;
  Start: string;
  ShiftType: ShiftType;
  VolunteerId: string;
  'User.UserId': string;
}>;

export type ShiftsPaginatedResponse = {
  records: Array<ShiftOverview>;
  totalNumbersOfRecords: number;
};

type ShiftResponse = {
  errors: Record<string, string[]>;
  isValid: boolean;
  result: Shift;
};

type ShiftCountByDateResponse = {
  totalShiftCount: number;
  dayShiftsCount: number;
  nightShiftsCount: number;
};

type GetShiftCountQuery = {
  date: string;
};

type GetShiftVolunteersQuery = {
  dayOfShift: string;
  Skip: number;
  Take: number;
  sortBy?: string;
  sortOrder?: string;
};

type ShiftVolunteerDto = {
  shiftId: string;
  volunteerId: string;
  shiftType: ShiftType;
  fullName: string;
  email: string;
};
type ShiftVolunteersResponse = {
  records: Array<ShiftVolunteerDto>;
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
  getShifts: builder.query<ShiftsPaginatedResponse, GetShiftsEndpointParams>({
    providesTags: [shiftTag],
    query: (params: GetShiftsEndpointParams) => ({
      providesTags: [shiftTag],
      url: '/Shift',
      method: 'GET',
      params,
    }),
  }),
  getShifts2: builder.query<ShiftsPaginatedResponse, { volunteerId?: string }>({
     providesTags: [shiftsTag],  
     query: (params) => {
       // Construct the URL with the volunteerId if provided
       const queryParams = params.volunteerId ? `?volunteerId=${params.volunteerId}` : '';
       return {
           url: `/Shift${queryParams}`,
           method: 'GET'
       };
     },
   }),
  getShiftCountByDate: builder.query<
    ShiftCountByDateResponse,
    GetShiftCountQuery
  >({
    providesTags: [shiftTag],
    query: (params: GetShiftCountQuery) => ({
      providesTags: [shiftTag],
      url: '/Shift/GetCountByDate',
      method: 'GET',
      params,
    }),
  }),
  getShift: builder.query<Shift, string>({
    providesTags: [shiftTag],
    query: (id: string) => ({
      url: `/Shift/${id}`,
      method: 'GET',
    }),
  }),
  getShiftVolunteers: builder.query<
    ShiftVolunteersResponse,
    GetShiftVolunteersQuery
  >({
    providesTags: [shiftTag],
    query: (params: GetShiftVolunteersQuery) => ({
      url: '/Shift/Volunteers',
      method: 'GET',
      params,
    }),
  }),

  addShift: builder.mutation<ShiftResponse, { shiftDto: Shift }>({
    invalidatesTags: [shiftTag],
    query: (shiftData: { shiftDto: Shift }) => ({
      url: '/Shift',
      method: 'POST',
      body: shiftData,
    }),
  }),
  updateShift: builder.mutation<ShiftResponse, { shiftDto: Shift }>({
    invalidatesTags: [shiftTag],
    query: (shiftData: { shiftDto: Shift }) => ({
      url: `/Shift`,
      method: 'PUT',
      body: shiftData,
    }),
  }),
  removeShift: builder.mutation<ShiftResponse, string>({
    invalidatesTags: [shiftTag],
    query: (id: string) => ({
      url: `/Shift/${id}`,
      method: 'DELETE',
    }),
  }),
});