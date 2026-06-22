import { create } from "zustand"

export type Thought = {
  id: number
  text: string
}

type BrainDumpStore = {
  thoughts: Thought[]

  setThoughts: (
    thoughts: Thought[]
  ) => void

  addThought: (
    thought: Thought
  ) => void

  removeThought: (
    id: number
  ) => void
}

export const useBrainDumpStore =
  create<BrainDumpStore>()(
    (set) => ({
      thoughts: [],

      setThoughts: (
        thoughts
      ) =>
        set({
          thoughts,
        }),

      addThought: (
        thought
      ) =>
        set((state) => ({
          thoughts: [
            thought,
            ...state.thoughts,
          ],
        })),

      removeThought: (
        id
      ) =>
        set((state) => ({
          thoughts:
            state.thoughts.filter(
              (
                thought
              ) =>
                thought.id !==
                id
            ),
        })),
    })
  )