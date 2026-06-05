import { HandlerEvent, HandlerResponse } from '@netlify/functions';

/**
 * Mimics the Express/Vercel Request interface for use with existing handlers.
 */
export interface IRequest {
  url: string;
  query: Record<string, string | string[]>;
}

/**
 * Mimics the Express/Vercel Response interface.
 * Collects response data internally so it can be converted to a Netlify HandlerResponse.
 */
export class MockResponse {
  private _statusCode: number = 200;
  private _headers: Record<string, string> = {};
  private _body: string = '';

  status(code: number): this {
    this._statusCode = code;
    return this;
  }

  send(body: string): this {
    this._body = body;
    return this;
  }

  setHeader(key: string, value: string): this {
    this._headers[key] = value;
    return this;
  }

  writeHead(code: number, headers: Record<string, string>): this {
    this._statusCode = code;
    Object.assign(this._headers, headers);
    return this;
  }

  end(): this {
    return this;
  }

  redirect(url: string): this {
    this._statusCode = 302;
    this._headers['Location'] = url;
    return this;
  }

  /**
   * Converts the collected response data into a Netlify HandlerResponse object.
   */
  toNetlifyResponse(): HandlerResponse {
    return {
      statusCode: this._statusCode,
      headers: this._headers,
      body: this._body,
    };
  }
}

/**
 * Creates a mock request object compatible with existing handlers from a Netlify HandlerEvent.
 *
 * @param {HandlerEvent} event Netlify function event.
 * @returns {IRequest} Mock request object.
 */
export function createRequestFromEvent(event: HandlerEvent): IRequest {
  const qs = event.rawQuery ? `?${event.rawQuery}` : '';
  return {
    url: `${event.path || '/'}${qs}`,
    query: event.queryStringParameters || {},
  };
}
