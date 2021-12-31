export const wrappedLocalStorage = (key: string, value?: string) => {
    return {
        set: () => {
            if (!value) {
                alert("Value is not set " + key)
            }
            if (typeof value !== 'string') {
                value = JSON.stringify(value);
            }
            return localStorage.setItem(key, value)
        }
        ,
        get: (parse: boolean = false) => {
            const item = localStorage.getItem(key);
            return parse ? JSON.parse(item as string) : item;
        }
    }
}

