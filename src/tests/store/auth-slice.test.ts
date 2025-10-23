import { describe, it, expect } from 'vitest';
import authReducer, { setAuthorizationStatus, AuthorizationStatus } from '../../entities/auth/model/slice';

describe('authSlice reducer', () => {
  it('should return initial state', () => {
    expect(authReducer(undefined, { type: '' })).toEqual({
      authorizationStatus: AuthorizationStatus.Unknown,
    });
  });

  it('should handle setAuthorizationStatus', () => {
    const prevState = { authorizationStatus: AuthorizationStatus.Unknown };
    expect(authReducer(prevState, setAuthorizationStatus(AuthorizationStatus.Authorized)))
      .toEqual({ authorizationStatus: AuthorizationStatus.Authorized });
  });
});