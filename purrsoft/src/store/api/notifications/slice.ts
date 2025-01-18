import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';

const notificationTag = 'Notification';
type TagTypes = typeof notificationTag;

// i will have just get notifications

type NotificationDto = {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
};

type GetNotificationsQuery = Partial<{
  userId: string;
  type: string;
  isRead: boolean;
}>;

type GetNotificationByIdQuery = {
  notificationId: string;
};

type NotificationUpdate = {
  notificationId: string;
  type: string;
  message: string;
  isRead: boolean;
};

type NotificationResponse = {
  errors: Record<string, string[]>;
  isValid: boolean;
  result: NotificationDto;
};

type NotificationsResponse = {
  records: Array<NotificationDto>;
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
  getNotifications: builder.query<NotificationsResponse, GetNotificationsQuery>(
    {
      query: (params) => ({
        url: `/notifications`,
        params,
      }),
      providesTags: [notificationTag],
    },
  ),
  getNotificationById: builder.query<
    NotificationResponse,
    GetNotificationByIdQuery
  >({
    query: ({ notificationId }) => ({
      url: `/notifications/${notificationId}`,
    }),
  }),
  updateNotification: builder.mutation<
    NotificationResponse,
    NotificationUpdate
  >({
    query: ({ notificationId, ...data }) => ({
      url: `/notifications/${notificationId}`,
      method: 'PUT',
      body: data,
    }),
    invalidatesTags: [{ type: notificationTag }],
  }),
});
