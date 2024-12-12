import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';

type ApiErrors = Record<string, string[]>;
//define the shape of the user object
export type User = {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
  token: string;
  email: string;
  roles: string[];
};
//define the shape of the login response
export type LoginResponse = {
  errors: ApiErrors;
  isValid: boolean;
  result: {
    token: string;
    user: User;
  };
};
//define the shape of the login request
type LoginRequest = {
  email: string;
  password: string;
};
//define the shape of the register response
type RegisterResponse = {
  errors: ApiErrors;
  isValid: boolean;
};
//role of the user
export type UserRole = 'Manager' | 'Foster' | 'Volunteer';
//define the shape of the register request
type RegisterRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};

//change password request
type ChangePasswordRequest = {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const accountTag = 'Account';
type TagTypes = typeof accountTag;
type RoleAndStatus = {
  role: string;
  status: string;
};

type RolesAndStatusResponse = {
  records: RoleAndStatus[];
  totalNumberOfRecords: number;
};

type RoleAndDates = {
  role: string;
  startDate: string;
  endDate: string;
};
type RoleAndDatesRespone = {
  records: RoleAndDates[];
  totalNumberOfRecords: number;
};
// Define the shape of the API endpoints
// add the endpoints to the builder
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
  account: builder.query<User, void>({
    providesTags: [accountTag],
    query: () => ({
      url: '/Account',
      method: 'GET',
    }),
  }),
  login: builder.mutation<LoginResponse, LoginRequest>({
    query: (credentials) => ({
      url: '/Auth/Login',
      method: 'POST',
      body: credentials,
      credentials: 'include',
    }),
  }),
  register: builder.mutation<RegisterResponse, RegisterRequest>({
    query: (credentials) => ({
      url: '/Auth/Register',
      method: 'POST',
      body: credentials,
    }),
  }),
  logout: builder.mutation<void, void>({
    query: () => ({
      url: '/Auth/Logout',
      method: 'POST',
      credentials: 'include',
    }),
  }),
  changePassword: builder.mutation<void, ChangePasswordRequest>({
    query: (credentials) => ({
      url: '/Auth/ChangePassword',
      method: 'POST',
      body: credentials,
    }),
  }),
  updateAccount: builder.mutation<User, { applicationUserDto: Partial<User> }>({
    invalidatesTags: [accountTag],
    query: ({ applicationUserDto }) => ({
      url: '/Account',
      method: 'PUT',
      body: { applicationUserDto },
    }),
  }),
  rolesAndStatus: builder.query<RolesAndStatusResponse, string>({
    query: (id) => ({
      url: `/Account/${id}/GetRolesAndStatuses`,
      method: 'GET',
    }),
  }),
  rolesAndDates: builder.query<RoleAndDatesRespone, string>({
    query: (id) => ({
      url: `/Account/${id}/GetRolesAndDates`,
      method: 'GET',
    }),
  }),
});
