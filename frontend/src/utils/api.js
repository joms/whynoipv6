export const apiFetch = (url = '', body = null) => {
    return fetch('https://whynoipv6.com/api' + url, {
        headers: {
            'content-type': 'application/json',
        },
    }).then(res => res.json());
};
