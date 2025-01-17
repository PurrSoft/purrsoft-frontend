import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
// import { Volunteer } from "../volunteers/slice";

const eventTag = 'Event';
type TagTypes = typeof eventTag;
type ApiErrors = Record<string, string[]>;

export type Eveniment = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description: string;
  attendingVolunteers: string[];
};

export type EventsPaginatedResponse = {
  records: Array<Omit<Eveniment, 'eventTags'> & { tags: string[] }>;
  totalNumbersOfRecords: number;
};

export type EventResponse = {
  result: string;
  errors: ApiErrors;
  isValid: boolean;
};

type GetFilteredEventsQueries = Partial<{
  Skip: number;
  Take: number;
  SortBy: string;
  SortOrder: string;
  Search: string;
  Date: string;
  Location: string;
  AttendingVolunteer: string;
  FromDate: string;
  ToDate: string;
}>;

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
  getEvents: builder.query<EventsPaginatedResponse, GetFilteredEventsQueries>({
    providesTags: [eventTag],
    query: (params: GetFilteredEventsQueries) => ({
      url: '/Events',
      method: 'GET',
      params,
    }),
  }),
  addEvent: builder.mutation<EventResponse, Partial<Eveniment>>({
    invalidatesTags: [eventTag],
    query: (event) => ({
      url: '/Events',
      method: 'POST',
      body: {
        eventDto: {
          title: event.title,
          subtitle: event.subtitle,
          date: event.date,
          location: event.location,
          description: event.description,
          volunteers: event.attendingVolunteers,
        },
      },
    }),
  }),
});
