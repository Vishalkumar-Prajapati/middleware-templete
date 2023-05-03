
const arr = [["Apple", "Sweet"], ["Book", "Self-Help"], ["Bus", "Trip"]]
// //console.log(Object.fromEntries(arr));
function for_of(arr) {
    const object = {};
    // for (const [key, value] of arr) {
    //     object[key] = value;
    // }
    for (const index in arr) {
        const [key, value] = arr[index];
        object[key] = value;
    }
    return object;
}
console.log('function1 ::' ,for_of(arr));