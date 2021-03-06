import axios from 'axios';

import { affiliatesPath } from '../utils/Pathnames';

import {
  FETCH_GROUPS,
  FETCH_AFFILIATES,
  FETCH_GROUP
} from './types';

export const fetchGroups = (queryString = '') => {
  const request = axios.get(`/groups.json${queryString}`);

  return {
    type: FETCH_GROUPS,
    payload: request
  };
};

export const fetchAffiliates = (queryString = '') => {
  const request = axios.get(`${affiliatesPath()}.json${queryString}`);

  return {
    type: FETCH_AFFILIATES,
    payload: request
  };
};


export const fetchGroup = (groupId) => {
  const request = axios.get(`/groups/${groupId}.json`);

  return {
    type: FETCH_GROUP,
    payload: request
  };
};
