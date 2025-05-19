export function search(obj, input) {
    let results = [];

    for (let i = 0; i < obj.length; i++) {
        for (const key in obj[i]) {
            if (obj[i][key].toString().toLowerCase().includes(input)) {
                results.push(obj[i].number);
                break; // Skip to next object once a match is found
            }
        }
    }
    return results;
}