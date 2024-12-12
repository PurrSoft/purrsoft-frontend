import { 
    BaseQueryFn,
    EndpointBuilder, 
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/query";

const requestsTag = 'Requests';
type TagTypes = typeof requestsTag;

export type Request = {
    email: string;
    name: string;
    description: string;
}

export type RequestsResponse = {
  records: Array<Omit<Request, 'requestTags'> & { tags: string[] }>;
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
    getRequests: builder.query<RequestsResponse, void>({
      providesTags: [requestsTag],  
      query: () => ({
            url: '/GoogleForms',
            method: 'GET'
        }),
    }),
  });