import { create } from "zustand"
import { persist } from "zustand/middleware"

function formatTime(
  time: string
) {
  const [hours, minutes] =
    time.split(":")

  const hourNum =
    Number(hours)

  const suffix =
    hourNum >= 12
      ? "PM"
      : "AM"

  const formattedHour =
    hourNum % 12 || 12

  return `${formattedHour}:${minutes} ${suffix}`
}

type ChecklistItem = {
  id: number
  text: string
  completed: boolean
}

export type Slot = {
  id: number
  title: string
  time: string

  nextAction1: string
  nextAction2: string

  checklist: ChecklistItem[]

  notes: string
}

type SlotStore = {
  slots: Slot[]
  selectedSlot: Slot | null

  mobileDrawerOpen: boolean

  addSlot: (
    title: string,
    time: string
  ) => void

  addSlotFromThought: (
    text: string
  ) => void

  deleteSlot: (
    slotId: number
  ) => void

  updateSlot: (
    slotId: number,
    title: string,
    time: string
  ) => void

  selectSlot: (
    slot: Slot
  ) => void

  setChecklist: (
  slotId: number,
  checklist: {
    id: number
    text: string
    completed: boolean
  }[]
) => void

  openMobileDrawer: () => void
  closeMobileDrawer: () => void

  updateNextAction: (
    slotId: number,
    field:
      | "nextAction1"
      | "nextAction2",
    value: string
  ) => void

  addChecklistItem: (
    slotId: number,
    text: string
  ) => void

  toggleChecklistItem: (
    slotId: number,
    itemId: number
  ) => void

  updateChecklistItem: (
    slotId: number,
    itemId: number,
    text: string
  ) => void

  deleteChecklistItem: (
    slotId: number,
    itemId: number
  ) => void

  updateNotes: (
    slotId: number,
    notes: string
  ) => void

  setSlots: (
  slots: Slot[]
) => void
}

export const useSlotStore =
  create<SlotStore>()(
    persist(
      (set) => ({
        slots: [],

        selectedSlot: null,

        mobileDrawerOpen:
          false,

        openMobileDrawer:
          () =>
            set({
              mobileDrawerOpen:
                true,
            }),

        closeMobileDrawer:
          () =>
            set({
              mobileDrawerOpen:
                false,
            }),

        addSlot: (
          title,
          time
        ) => {
          const newSlot = {
            id: Date.now(),

            title,

            time:
              formatTime(
                time
              ),

            nextAction1:
              "",

            nextAction2:
              "",

            checklist: [],

            notes: "",
          }

          set((state) => ({
            slots: [
              ...state.slots,
              newSlot,
            ],

            selectedSlot:
              newSlot,
          }))
        },

        addSlotFromThought:
          (text) => {
            const newSlot =
              {
                id: Date.now(),

                title:
                  text,

                time:
                  "No Time",

                nextAction1:
                  "",

                nextAction2:
                  "",

                checklist:
                  [],

                notes:
                  "",
              }

            set(
              (
                state
              ) => ({
                slots: [
                  ...state.slots,
                  newSlot,
                ],

                selectedSlot:
                  newSlot,
              })
            )
          },

        deleteSlot: (
          slotId
        ) =>
          set((state) => {
            const index =
              state.slots.findIndex(
                (
                  slot
                ) =>
                  slot.id ===
                  slotId
              )

            const updatedSlots =
              state.slots.filter(
                (
                  slot
                ) =>
                  slot.id !==
                  slotId
              )

            let nextSelected =
              null

            if (
              updatedSlots.length >
              0
            ) {
              nextSelected =
                updatedSlots[
                  index
                ] ??
                updatedSlots[
                  index -
                    1
                ]
            }

            return {
              slots:
                updatedSlots,

              selectedSlot:
                nextSelected,
            }
          }),

        updateSlot: (
          slotId,
          title,
          time
        ) =>
          set((state) => {
            const updatedSlots =
              state.slots.map(
                (
                  slot
                ) =>
                  slot.id ===
                  slotId
                    ? {
                        ...slot,

                        title,

                        time:
                          formatTime(
                            time
                          ),
                      }
                    : slot
              )

            return {
              slots:
                updatedSlots,

              selectedSlot:
                updatedSlots.find(
                  (
                    slot
                  ) =>
                    slot.id ===
                    slotId
                ) ??
                null,
            }
          }),

        selectSlot: (
          slot
        ) =>
          set(
            (
              state
            ) => ({
              selectedSlot:
                state.slots.find(
                  (
                    s
                  ) =>
                    s.id ===
                    slot.id
                ) ?? null,
            })
          ),

        updateNextAction:
          (
            slotId,
            field,
            value
          ) =>
            set(
              (
                state
              ) => {
                const updatedSlots =
                  state.slots.map(
                    (
                      slot
                    ) =>
                      slot.id ===
                      slotId
                        ? {
                            ...slot,

                            [field]:
                              value,
                          }
                        : slot
                  )

                return {
                  slots:
                    updatedSlots,

                  selectedSlot:
                    updatedSlots.find(
                      (
                        slot
                      ) =>
                        slot.id ===
                        slotId
                    ) ??
                    null,
                }
              }
            ),

        addChecklistItem:
          (
            slotId,
            text
          ) =>
            set(
              (
                state
              ) => {
                const updatedSlots =
                  state.slots.map(
                    (
                      slot
                    ) =>
                      slot.id ===
                      slotId
                        ? {
                            ...slot,

                            checklist:
                              [
                                ...slot.checklist,

                                {
                                  id:
                                    Date.now(),

                                  text,

                                  completed:
                                    false,
                                },
                              ],
                          }
                        : slot
                  )

                return {
                  slots:
                    updatedSlots,

                  selectedSlot:
                    updatedSlots.find(
                      (
                        slot
                      ) =>
                        slot.id ===
                        slotId
                    ) ??
                    null,
                }
              }
            ),

        toggleChecklistItem:
          (
            slotId,
            itemId
          ) =>
            set(
              (
                state
              ) => {
                const updatedSlots =
                  state.slots.map(
                    (
                      slot
                    ) =>
                      slot.id ===
                      slotId
                        ? {
                            ...slot,

                            checklist:
                              slot.checklist.map(
                                (
                                  item
                                ) =>
                                  item.id ===
                                  itemId
                                    ? {
                                        ...item,

                                        completed:
                                          !item.completed,
                                      }
                                    : item
                              ),
                          }
                        : slot
                  )

                return {
                  slots:
                    updatedSlots,

                  selectedSlot:
                    updatedSlots.find(
                      (
                        slot
                      ) =>
                        slot.id ===
                        slotId
                    ) ??
                    null,
                }
              }
            ),

        updateChecklistItem:
          (
            slotId,
            itemId,
            text
          ) =>
            set(
              (
                state
              ) => {
                const updatedSlots =
                  state.slots.map(
                    (
                      slot
                    ) =>
                      slot.id ===
                      slotId
                        ? {
                            ...slot,

                            checklist:
                              slot.checklist.map(
                                (
                                  item
                                ) =>
                                  item.id ===
                                  itemId
                                    ? {
                                        ...item,
                                        text,
                                      }
                                    : item
                              ),
                          }
                        : slot
                  )

                return {
                  slots:
                    updatedSlots,

                  selectedSlot:
                    updatedSlots.find(
                      (
                        slot
                      ) =>
                        slot.id ===
                        slotId
                    ) ??
                    null,
                }
              }
            ),

        deleteChecklistItem:
          (
            slotId,
            itemId
          ) =>
            set(
              (
                state
              ) => {
                const updatedSlots =
                  state.slots.map(
                    (
                      slot
                    ) =>
                      slot.id ===
                      slotId
                        ? {
                            ...slot,

                            checklist:
                              slot.checklist.filter(
                                (
                                  item
                                ) =>
                                  item.id !==
                                  itemId
                              ),
                          }
                        : slot
                  )

                return {
                  slots:
                    updatedSlots,

                  selectedSlot:
                    updatedSlots.find(
                      (
                        slot
                      ) =>
                        slot.id ===
                        slotId
                    ) ??
                    null,
                }
              }
            ),

        updateNotes: (
          slotId,
          notes
        ) =>
          set((state) => {
            const updatedSlots =
              state.slots.map(
                (
                  slot
                ) =>
                  slot.id ===
                  slotId
                    ? {
                        ...slot,
                        notes,
                      }
                    : slot
              )

            return {
              slots:
                updatedSlots,

              selectedSlot:
                updatedSlots.find(
                  (
                    slot
                  ) =>
                    slot.id ===
                    slotId
                ) ??
                null,
            }
          }),
        
        setSlots: (
  slots
) =>
  set((state) => {
    const selectedSlot =
      state.selectedSlot

    return {
      slots,

      selectedSlot:
        selectedSlot
          ? slots.find(
              (slot) =>
                slot.id ===
                selectedSlot.id
            ) ?? null
          : null,
    }
  }),
  setChecklist: (
  slotId,
  checklist
) =>
  set((state) => {
    const updatedSlots =
      state.slots.map(
        (slot) =>
          slot.id === slotId
            ? {
                ...slot,
                checklist,
              }
            : slot
      )

    return {
      slots: updatedSlots,

      selectedSlot:
        state.selectedSlot?.id ===
        slotId
          ? updatedSlots.find(
              (slot) =>
                slot.id ===
                slotId
            ) ?? null
          : state.selectedSlot,
    }
  }),
      }),
      {
        name:
          "luxora-slot-storage",
      }
    )
  )