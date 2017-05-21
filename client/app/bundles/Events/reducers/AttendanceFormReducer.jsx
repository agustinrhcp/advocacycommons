import {
  LOOK_UP_MEMBER, SET_ATTENDANCE_ATTRIBUTE, CREATE_ATTENDANCE
} from '../actions/types';

const INITIAL_STATE = {
  'primary-email-address': '',
  'given-name': '',
  'family-name': '',
  'primary-phone-number': '',
  'disabled': '',
  'successAlert': '',
  'errorAlert': ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_ATTENDANCE_ATTRIBUTE:
    const { prop, value } = action.payload;
    return { ...state, [prop]: value, successAlert: '', errorAlert: '' };
  case CREATE_ATTENDANCE:
    if (action.payload.status === 200) {
      return { ...INITIAL_STATE, successAlert: 'Attendee Successfully Created' }
    }

    console.log(action.payload);

    return state;
  case LOOK_UP_MEMBER:
    const members = action.payload.data.members.data;

    if (members.length) {
      const { attributes } = members[0];
      return { ...state, ...attributes, disabled: true }
    } else if (state.disabled) {
      return {
        ...INITIAL_STATE,
        ['primary-email-address']:  state['primary-email-address']
      }
    }

    return state;
  default:
    return state;
  }
};
