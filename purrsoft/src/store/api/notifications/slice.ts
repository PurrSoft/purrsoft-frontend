import { BaseQueryFn, EndpointBuilder, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

const notificationsTag = 'Notifications';
type TagTypes = typeof notificationsTag;

export type Notifications = {
    id: string;
    type: string;
    message: string;
    isRead: boolean;
}

export type NotificationsResponse = {
  records: Array<Omit<Notifications, 'notificationsTags'> & { tags: string[] }>;
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
    getNotifications: builder.query<NotificationsResponse, void>({
      providesTags: [notificationsTag],  
      query: () => ({
            url: '/Notifications',
            method: 'GET'
        }),
    }),
  });