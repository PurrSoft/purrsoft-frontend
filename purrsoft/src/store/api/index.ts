import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
export { endpoints as authEndpoints } from './auth';
export { endpoints as animalsEndpoints } from './animals';
export { endpoints as fostersEndpoints } from './fosters';
export { endpoints as requestsEndpoints } from './requests';
export { endpoints as animalProfilesEndpoints } from './animalProfiles';
// rename the endpoints for each slice
type ApiSuccessResponse<TExpectedResponse> = {
  data: TExpectedResponse;
  error?: undefined;
};
type ApiErrorResponse = {
  data?: undefined;
  error: FetchBaseQueryError | SerializedError;
};

type BadRequestErrorResponse = {
  isValid: boolean;
  errors: Record<string, string[]>;
};

export const isApiError = <TExpectedResponse>(
  respData: ApiSuccessResponse<TExpectedResponse> | ApiErrorResponse,
): respData is ApiErrorResponse => !!respData.error;

export const isBadRequest = (
  errData: unknown,
): errData is BadRequestErrorResponse =>
  !!errData && typeof errData === 'object' && 'errors' in errData;
