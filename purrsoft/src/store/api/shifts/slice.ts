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
      url: '/Shift',
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
