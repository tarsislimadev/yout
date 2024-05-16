import { RequestModel } from '../models/request.model.js'

export const getEndpointFromList = (name = '') => getEndpointsList().find((request) => request.name == name)

export const getEndpointsList = () => Array.from([
  new RequestModel('Yout APIs'),
  new RequestModel('News API (everything)', 'GET', 'https://newsapi.org/v2/everything', { query: ['from', 'to', 'language', 'sortBy', 'q', 'pageSize', 'page', 'apiKey'] }),
  new RequestModel('News API (top headlines)', 'GET', 'https://newsapi.org/v2/top-headlines', { query: ['country', 'category', 'q', 'pageSize', 'page', 'apiKey'] }),
  new RequestModel('Voice RSS API (text to speech)', 'GET', 'http://api.voicerss.org/', { query: ['key', 'src', 'hl'] }, { content_type: 'audio/wav' }),
])
