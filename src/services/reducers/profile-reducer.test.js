import profileReducer, {
  setUser,
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  exitRequest,
  exitSuccess,
  exitFailed,
  userUnauthorized,
} from './profile-reducer';

describe('profile reducer', () => {
  it('initial state return', () => {
    expect(profileReducer(undefined, {})).toEqual({
      user: null,
      getUserRequest: false,
      getUserLoaded: false,
      getUserFailed: '',
      exitRequest: false,
      exitFailed: '',
      userUnauthorized: false,
    });
  });

  it('action: setUser', () => {
    const payload = {
      name: 'name',
      email: 'email',
    };
    expect(profileReducer({}, setUser(payload))).toEqual({
      user: payload,
      userUnauthorized: false,
      exitFailed: '',
    });
  });

  it('action: getUserRequest', () => {
    expect(profileReducer({}, getUserRequest())).toEqual({
      getUserRequest: true,
    });
  });

  it('action: getUserSuccess', () => {
    const payload = {
      name: 'name',
      email: 'email',
    };
    expect(profileReducer({}, getUserSuccess(payload))).toEqual({
      user: payload,
      userUnauthorized: false,
      getUserRequest: false,
      getUserLoaded: true,
      getUserFailed: '',
    });
  });

  it('action: getUserFailed', () => {
    expect(profileReducer({}, getUserFailed('error message'))).toEqual({
      getUserRequest: false,
      getUserLoaded: true,
      getUserFailed: 'error message',
    });
  });

  it('action: exitRequest', () => {
    expect(profileReducer({}, exitRequest())).toEqual({
      exitRequest: true,
      getUserLoaded: true,
    });
  });

  it('action: exitSuccess', () => {
    expect(profileReducer({}, exitSuccess())).toEqual({
      user: null,
      exitRequest: false,
      userUnauthorized: true,
    });
  });

  it('action: exitFailed', () => {
    expect(profileReducer({}, exitFailed('error message'))).toEqual({
      exitRequest: false,
      exitFailed: 'error message',
    });
  });

  it('action: userUnauthorized', () => {
    expect(profileReducer({}, userUnauthorized())).toEqual({
      userUnauthorized: true,
    });
  });
});
