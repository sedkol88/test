let arr = []
for (let i = 1; i <= 500; i += 1) {
    if (i % 2 === 1 && i % 3 === 1 && i % 4 === 1 && i % 5 === 1 && i % 6 === 1 && i % 7 === 0) {
        arr.push(i)
    }
}
console.log(arr)
