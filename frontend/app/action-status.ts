"use server";

export async function actionStatus(jobId: string) {
  console.log("firing actionStatus");
  const res = await fetch(`http://localhost:4000/status?job_id=${jobId}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("something went wrong");
  const data = await res.json();
  return data;
}
