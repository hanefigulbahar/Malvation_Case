export function request(
  url: string,
  method: string,
  data?: unknown,
  id?: string
) {
  try {
    switch (method) {
      case "GET":
        return fetch(url)
          .then((res) => res.json())
          .catch((err) => err);
      case "PUT":
        fetch(url + id, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data,
          }),
        })
          .then((res) => res.json())
          .then(console.log);
        break;
      case "DELETE":
        fetch(url + id, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(console.log);
        break;
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
