export async function methodMadness(method, path, body) {
  let headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Origin", "http://localhost:3001");

  const url = path ? `http://localhost:3001/${path}` : `http://localhost:3001/`;

  const options = {
    mode: "cors",
    credentials: "include",
    method,
    headers: headers,
  };

  if (body) {
    options["body"] = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, options);
    const formatted = await response.json();
    const data = await formatted;
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
