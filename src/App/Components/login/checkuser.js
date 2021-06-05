export default function checkuser(state) {
  const users = [
    { email: "mohamed@instabug.com", password: "12345678" },
    { email: "mohamed1@instabug.com", password: "12345678" },
    { email: "mohamed2@instabug.com", password: "12345678" },
    { email: "mohamed3@instabug.com", password: "12345678" },
    { email: "mohamed4@instabug.com", password: "12345678" },
    { email: "mohamed5@instabug.com", password: "12345678" },
    { email: "mohamed6@instabug.com", password: "12345678" },
    { email: "mohamed7@instabug.com", password: "12345678" },
  ];

  const user = users.find((ele) => state.email === ele.email && state.password === ele.password);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.replace("/home");
  }

  return user;
}
