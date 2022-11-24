export const SetJwt = (currentUser) => {
  fetch(`${process.env.REACT_APP_domain}/jwt`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("token", data.token);
    });
};
