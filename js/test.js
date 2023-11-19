const makeGreeting = guestName => {
  if (guestName === "" || guestName === undefined) {
    return Promise.reject("Guest name must not be empty");
  }

  return Promise.resolve(`Welcome ${guestName}`);
};

makeGreeting("")
  .then(greeting => console.log(greeting))
  .catch(error => console.error(error));