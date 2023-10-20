// const obj = {
//     array: [83, 44, 6, 79],
//     dividedByTwo: function () {
//         const newArray = [];
//         this.array.forEach((arr) => {
//             if (arr % 2 === 1) {
//                 newArray.push(arr);
//             }
//         })
//         console.log(newArray)
//     }
// }
// // console.log(obj.dividedByTwo())
// obj.dividedByTwo()

const form = document.querySelector('.js-form')
form.addEventListener('submit', handleSubmit)
function handleSubmit(event) {
    event.preventDefault()
    const{input, comment} = event.currentTarget.elements
    const feedback = {
      input: input.value,
      comment: comment.value
    }
  console.log(feedback)
  // event.currentTarget.reset()
  event.currentTarget.elements.comment.value = ''
}


// const obj = {
//     array: [83, 44, 6, 79],
//     dividedByTwo: function() {
//         const newArray = [];
//         this.array.forEach(function(arr) {
//             if (arr % 2 === 0) {
//                 newArray.push(arr);
//             }
//         });
//         return newArray;
//     }
// };

// console.log(obj.dividedByTwo())
