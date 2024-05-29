export interface QueryParamsType {
  [queryParam: string]: string;
}

class QueryStringService {
  private getURLSearchParams(): URLSearchParams {
    return new URLSearchParams(window.location.search);
  }

  private updateHistoryState(urlParams: URLSearchParams): void {
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}${window.location.hash}`);
  }

  public clearAllQueryParams() {
    window.history.replaceState({}, '', `${window.location.pathname}`);
  }

  public getQueryParams(): QueryParamsType {
    const urlParams: URLSearchParams = this.getURLSearchParams();
    const queryParams: QueryParamsType = Object.fromEntries(urlParams.entries());

    return queryParams;
  }

  public addQueryParam(name: string, value: string): void {
    const urlParams: URLSearchParams = this.getURLSearchParams();

    const newQueryParamValuesString: string = urlParams.has(name) ? `${urlParams.get(name)} ${value}` : value;

    urlParams.set(name, newQueryParamValuesString);
    this.updateHistoryState(urlParams);
  }

  public deleteQueryParam(name: string, value: string): void {
    const urlParams: URLSearchParams = this.getURLSearchParams();

    const queryParamValuesString: string | null = urlParams.get(name);
    if (!queryParamValuesString) return;

    const queryParamValues: string[] = queryParamValuesString.split(' ');

    if (queryParamValues.length === 1) {
      urlParams.delete(name);
    } else {
      const newQueryParamValues: string[] = queryParamValues.filter((queryParamValue) => queryParamValue !== value);
      urlParams.set(name, newQueryParamValues.join(' '));
    }

    this.updateHistoryState(urlParams);
  }

  public setQueryParam(name: string, value: string): void {
    const urlParams: URLSearchParams = this.getURLSearchParams();
    urlParams.set(name, value);
    this.updateHistoryState(urlParams);
  }
}

const queryStringService = new QueryStringService();

export default queryStringService;
