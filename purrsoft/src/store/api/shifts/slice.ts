import { 
    BaseQueryFn,
    EndpointBuilder, 
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/query";

const shiftsTag = 'Shifts';
type TagTypes = typeof shiftsTag;

export type Shift = {
    id: string;
    start: string;
    shiftType: string;
    volunteerId: string;
}

export type ShiftsPaginatedResponse = {
  records: Array<Omit<Shift, 'shiftTags'> & { tags: string[] }>;
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
    getShifts: builder.query<ShiftsPaginatedResponse, { volunteerId?: string }>({
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
  });