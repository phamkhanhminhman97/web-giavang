import env from '@/utils/environment';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface HttpOptions extends Omit<RequestInit, 'body'> {
  method?: HttpMethod;
  timeoutMs?: number;
  body?: RequestInit['body'] | Record<string, unknown> | unknown;
}

export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const buildUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${env.API_URL.replace(/\/$/, '')}${normalizedPath}`;
};

const shouldSerializeBody = (body?: HttpOptions['body']) => {
  if (!body) return false;
  return !(body instanceof FormData) && !(body instanceof URLSearchParams) && typeof body !== 'string';
};

export const httpRequest = async <T>(path: string, options: HttpOptions = {}): Promise<T> => {
  const controller = new AbortController();
  const timeout = options.timeoutMs ?? env.API_TIMEOUT;
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const headers = new Headers(options.headers);
    if (!headers.has('Accept')) {
      headers.set('Accept', 'application/json');
    }

    let body: BodyInit | null | undefined = options.body as BodyInit;
    if (shouldSerializeBody(options.body)) {
      headers.set('Content-Type', 'application/json');
      body = JSON.stringify(options.body);
    }

    const response = await fetch(buildUrl(path), {
      ...options,
      headers,
      body,
      signal: options.signal ?? controller.signal,
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const payload = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      throw new ApiError(
        (payload as { message?: string })?.message || `API error: ${response.status}`,
        response.status,
        payload
      );
    }

    return payload as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Yêu cầu đã bị hủy do quá thời gian chờ', 408);
    }

    throw new ApiError(error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định');
  } finally {
    clearTimeout(timeoutId);
  }
};
