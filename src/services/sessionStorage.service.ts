export const sessionStorageService = {
    saveToStorage,
    loadFromStorage,
    clearStorage,
    removeItem
}

function saveToStorage(key: string, val: any) {
    sessionStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key: string) {
    const items = sessionStorage.getItem(key)
    const res = items ? JSON.parse(items) : null
    return res
}

function removeItem(key: string) {
    sessionStorage.removeItem(key)
}

function clearStorage() {
    sessionStorage.clear()
}
