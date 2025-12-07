export const secureFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = localStorage.getItem('auth_token');
    const headers = new Headers(options.headers);
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    const response = await fetch(url, {
        ...options,
        headers
    });
    if (response.status === 401) {
        window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return response;
};
