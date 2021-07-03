import { makeSearchQuery } from '@helpers';

const CORS_PROXY = 'https://cors.bridged.cc';
const API_URL = 'https://jobs.github.com';

export default class JobsAPI {
  constructor(options = {}) {
    this.options = { ...JobsAPI.defaultOptions, ...options };
  }

  static defaultOptions = {
    useCorsProxy: false,
  };

  getEndpoint(options = {}) {
    const { pathname = '' } = options;
    const { useCorsProxy } = this.options;

    const base = useCorsProxy ? CORS_PROXY : API_URL;
    const path = [useCorsProxy ? API_URL : '', pathname]
      .filter(Boolean)
      .join('/');
    const query = makeSearchQuery(options);

    const endpoint = new URL(base);
    endpoint.pathname = path;
    endpoint.search = query;
    return endpoint;
  }

  async fetchJobList(params = {}) {
    const endpoint = this.getEndpoint({
      pathname: 'positions.json',
      ...params,
    });
    const response = await fetch(endpoint);
    return response.json();
  }

  async fetchJobById(id) {
    const endpoint = this.getEndpoint({ pathname: `positions/${id}.json` });
    const response = await fetch(endpoint);
    if (response.status === 404)
      throw new Error(`The job with id ${id} is not found`);
    return response.json();
  }
}
