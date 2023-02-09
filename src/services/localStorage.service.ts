export const storageService = {
    saveToStorage,
    loadFromStorage,
    clearStorage
}


function saveToStorage(key: string, val: any) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key: string) {
    const items: any = localStorage.getItem(key)
    const res = items ? JSON.parse(items) : null
    return res
}

function clearStorage() {
    localStorage.clear()
}
