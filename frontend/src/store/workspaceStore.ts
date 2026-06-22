import { create } from "zustand"
import { persist } from "zustand/middleware"

type WorkspaceStore = {
  workspaceId: number | null

  setWorkspaceId: (
    workspaceId: number
  ) => void
}

export const useWorkspaceStore =
  create<WorkspaceStore>()(
    persist(
      (set) => ({
        workspaceId: null,

        setWorkspaceId: (
          workspaceId
        ) =>
          set({
            workspaceId,
          }),
      }),
      {
        name:
          "luxora-workspace",
      }
    )
  )