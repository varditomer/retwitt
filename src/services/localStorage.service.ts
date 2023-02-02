export const storageService = {
    saveToStorage,
    loadFromStorage,
}


function saveToStorage(key: string, val: any) {
    let storedItems = loadFromStorage(key)
    storedItems ? storedItems.push(val) : [val]
    localStorage.setItem(key, JSON.stringify(storedItems))
}

function loadFromStorage(key: string) {
    const items: any = localStorage.getItem(key)
    const res = items ? JSON.parse(items) : null
    return res
}
