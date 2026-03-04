"use server";

export async function actionRetrieve(url: string) {
  const res = await fetch("http://localhost:4000/retrieve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: url }),
  });

  if (!res.ok) throw new Error("something went wrong");
  const data = await res.json();
  return data;
}
