"use server";

export async function actionRetrieve(url: string) {
  const res = await fetch(`${process.env.API_ENDPOINT}/retrieve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.API_KEY ?? "",
    },
    body: JSON.stringify({ url: url }),
  });

  console.log(await res.json());

  if (!res.ok) throw new Error("server error");

  const data = await res.json();
  return data;
}
