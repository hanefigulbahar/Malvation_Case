export function request(url: string, method: string, data?: any) {
  try {
    switch (method) {
      case "GET":
        return fetch(url)
          .then((res) => res.json())
          .catch((err) => err);
      case "PATCH":
        return fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            role: data.role,
            active: data.active,
          }),
        })
          .then((res) => res.status)
          .catch((err) => err);

      case "POST":
        return fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        })
          .then((res) => res.json())
          .catch((err) => err);

      case "DELETE":
        return fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.status)
          .catch((err) => err);
    }
  } catch (error) {
    console.log(error);
  }
}
