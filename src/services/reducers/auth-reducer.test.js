import authReducer, {
  forgotPasswordFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  loginFailed,
  loginRequest,
  loginSuccess,
  refreshTokenFailed,
  refreshTokenRequest,
  refreshTokenSuccess,
  registerFailed,
  registerRequest,
  registerSuccess,
  resetPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
} from './auth-reducer';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      registerRequest: false,
      registerFailed: '',
      loginRequest: false,
      loginFailed: '',
      refreshTokenRequest: false,
      refreshTokenFailed: '',
      forgotPasswordRequest: false,
      forgotPasswordFailed: '',
      resetPasswordRequest: false,
      resetPasswordFailed: '',
    });
  });

  it('should handle registerRequest', () => {
    expect(authReducer({}, registerRequest())).toEqual({
      registerRequest: true,
    });
  });

  it('should handle registerSuccess', () => {
    expect(authReducer({}, registerSuccess())).toEqual({
      registerRequest: false,
      registerFailed: '',
    });
  });

  it('should handle registerFailed', () => {
    expect(authReducer({}, registerFailed('error'))).toEqual({
      registerRequest: false,
      registerFailed: 'error',
    });
  });

  it('should handle loginRequest', () => {
    expect(authReducer({}, loginRequest())).toEqual({
      loginRequest: true,
    });
  });

  it('should handle loginSuccess', () => {
    expect(authReducer({}, loginSuccess())).toEqual({
      loginRequest: false,
      loginFailed: '',
    });
  });

  it('should handle loginFailed', () => {
    expect(authReducer({}, loginFailed('error'))).toEqual({
      loginRequest: false,
      loginFailed: 'error',
    });
  });

  it('should handle refreshTokenRequest', () => {
    expect(authReducer({}, refreshTokenRequest())).toEqual({
      refreshTokenRequest: true,
    });
  });

  it('should handle refreshTokenSuccess', () => {
    expect(authReducer({}, refreshTokenSuccess())).toEqual({
      refreshTokenRequest: false,
      refreshTokenFailed: '',
    });
  });

  it('should handle refreshTokenFailed', () => {
    expect(authReducer({}, refreshTokenFailed('error'))).toEqual({
      refreshTokenRequest: false,
      refreshTokenFailed: 'error',
    });
  });

  it('should handle forgotPasswordRequest', () => {
    expect(authReducer({}, forgotPasswordRequest())).toEqual({
      forgotPasswordRequest: true,
    });
  });

  it('should handle forgotPasswordSuccess', () => {
    expect(authReducer({}, forgotPasswordSuccess())).toEqual({
      forgotPasswordRequest: false,
      forgotPasswordFailed: '',
    });
  });

  it('should handle forgotPasswordFailed', () => {
    expect(authReducer({}, forgotPasswordFailed('error'))).toEqual({
      forgotPasswordRequest: false,
      forgotPasswordFailed: 'error',
    });
  });

  it('should handle resetPasswordRequest', () => {
    expect(authReducer({}, resetPasswordRequest())).toEqual({
      resetPasswordRequest: true,
    });
  });

  it('should handle resetPasswordSuccess', () => {
    expect(authReducer({}, resetPasswordSuccess())).toEqual({
      resetPasswordRequest: false,
      resetPasswordFailed: '',
    });
  });

  it('should handle resetPasswordFailed', () => {
    expect(authReducer({}, resetPasswordFailed('error'))).toEqual({
      resetPasswordRequest: false,
      resetPasswordFailed: 'error',
    });
  });
});
