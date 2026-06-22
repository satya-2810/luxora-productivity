import { apiFetch } from "./client"

export async function createSlotApi(
  workspaceId: number,
  title: string,
  time: string
) {
  return apiFetch(
    "/slots/",
    {
      method: "POST",
      body: JSON.stringify({
        workspace_id:
          workspaceId,
        title,
        time,
      }),
    }
  )
}

export async function updateSlotApi(
  slotId: number,
  title: string,
  time: string
) {
  return apiFetch(
    `/slots/${slotId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        title,
        time,
      }),
    }
  )
}

export async function updateSlotNotesApi(
  slotId: number,
  notes: string
) {
  return apiFetch(
    `/slots/${slotId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        notes,
      }),
    }
  )
}

export async function updateNextActionsApi(
  slotId: number,
  nextAction1: string,
  nextAction2: string
) {
  return apiFetch(
    `/slots/${slotId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        next_action_1:
          nextAction1,
        next_action_2:
          nextAction2,
      }),
    }
  )
}

export async function deleteSlotApi(
  slotId: number
) {
  return apiFetch(
    `/slots/${slotId}`,
    {
      method: "DELETE",
    }
  )
}

export async function getSlotsApi(
  workspaceId: number
) {
  return apiFetch(
    `/slots/workspace/${workspaceId}`
  )
}