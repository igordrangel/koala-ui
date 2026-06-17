import { HttpErrorResponse } from '@angular/common/http';

export function sanitizeErrorMessage(response: HttpErrorResponse) {
  const message = response.error?.message || undefined;

  if (message) {
    return message;
  }

  switch (response.status) {
    case 400:
      return response.error || 'Bad request. Please check your input and try again.';
    case 404:
      return response.message || 'The requested resource was not found.';
    case 500:
      return response.message || 'An internal server error occurred. Please try again later.';
    case 0:
      return (
        response.message ||
        'Unable to connect to the server. Please check your internet connection.'
      );
    default:
      return 'An unexpected error occurred. Please try again later.';
  }
}
