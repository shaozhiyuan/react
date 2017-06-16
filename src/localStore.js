export function save(key,value) {
    return window.localStorage.setItem(key,JSON.stringify(value))
}
export function load(key,value) {
    return JSON.parse(window.localStorage.getItem(key))
}