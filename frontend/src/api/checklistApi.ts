import { apiFetch } from "./client"

export async function createChecklistItemApi(
  slotId: number,
  text: string
) {
  return apiFetch(
    "/checklist/",
    {
      method: "POST",
      body: JSON.stringify({
        slot_id: slotId,
        text,
      }),
    }
  )
}

export async function getChecklistApi(
  slotId: number
) {
  return apiFetch(
    `/checklist/slot/${slotId}`
  )
}

export async function updateChecklistItemApi(
  itemId: number,
  text: string,
  completed: boolean
) {
  return apiFetch(
    `/checklist/${itemId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        text,
        completed,
      }),
    }
  )
}

export async function deleteChecklistItemApi(
  itemId: number
) {
  return apiFetch(
    `/checklist/${itemId}`,
    {
      method: "DELETE",
    }
  )
}