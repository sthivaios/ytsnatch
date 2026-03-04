"use server";

export async function actionStatus(jobId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/status?job_id=${jobId}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) throw new Error("something went wrong");
  const data = await res.json();
  return data;
}
