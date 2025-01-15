import { 
    BaseQueryFn,
    EndpointBuilder, 
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/query";
import { Volunteer } from "../volunteers/slice";

const eventTag = 'Event';
type TagTypes = typeof eventTag;

export type Eveniment = {
    id: string;
    title: string;
    subtitle: string;
    where: string;
    when: string;
    description: string;
    volunteers: Volunteer[];
}

export type EventsPaginatedResponse = {
  records: Array<Omit<Eveniment, 'eventTags'> & { tags: string[] }>;
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
    getEvents: builder.query<EventsPaginatedResponse, void>({
        providesTags: [eventTag],  
        query: () => ({
            url: '/Animal',
            method: 'GET'
        }),
    }),
})