import { apiFetch } from "./client"

export async function createWorkspaceApi(
  workspaceKey: string
) {
  return apiFetch(
    "/workspace/",
    {
      method: "POST",
      body: JSON.stringify({
        workspace_key:
          workspaceKey,
      }),
    }
  )
}