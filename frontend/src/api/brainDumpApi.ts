import { apiFetch } from "./client"

export async function createBrainDumpApi(
  workspaceId: number,
  text: string
) {
  return apiFetch(
    "/brain-dump/",
    {
      method: "POST",
      body: JSON.stringify({
        workspace_id:
          workspaceId,
        text,
      }),
    }
  )
}

export async function getBrainDumpsApi(
  workspaceId: number
) {
  return apiFetch(
    `/brain-dump/workspace/${workspaceId}`
  )
}

export async function deleteBrainDumpApi(
  brainDumpId: number
) {
  return apiFetch(
    `/brain-dump/${brainDumpId}`,
    {
      method: "DELETE",
    }
  )
}