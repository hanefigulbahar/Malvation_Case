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
        }).then((res) => res.status);

      case "POST":
        return fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }).then((res) => res.json());

      case "DELETE":
        return fetch(url, {
          method: "DELETE",
        }).then((res) => res.status);
    }
  } catch (error) {
    console.log(error);
  }
}

/** 
 * return caches.open("my-cache").then(async (cache) => {
          return cache.match(url).then(async (response) => {
            if (response) {
              // Önbellekte veri bulundu, onu kullan
              return response.json().then((data) => data);
            }
            fetch(url)
              .then(async (networkResponse) => {
                if (networkResponse.ok) {
                  // Başarılı ağ yanıtı, yanıtı önbelleğe al
                  await cache.put(url, networkResponse.clone());
                }
                const data = await networkResponse.json();
                return data;
              })
              .catch((error) => {
                console.error(error);
              });
          });
        });
 */
