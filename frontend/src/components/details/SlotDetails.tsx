import { useState,
  useEffect
 } from "react"

import {
  Plus,
  Trash2,
  Pencil,
  Check,
} from "lucide-react"

import {
  useSlotStore,
} from "../../store/slotStore"

import {
  updateSlotApi,
  deleteSlotApi,
  updateSlotNotesApi,
  updateNextActionsApi
} from "../../api/slotApi"

import {
  createChecklistItemApi,
  getChecklistApi,
  updateChecklistItemApi,
  deleteChecklistItemApi
} from "../../api/checklistApi"

import EditSlotModal from "../ui/EditSlotModal"

function SlotDetails() {
  const {
    selectedSlot,
    deleteSlot,
    closeMobileDrawer,
    updateSlot,
    updateNextAction,
    updateNotes,
    setChecklist
  } = useSlotStore()

  const [
    checklistInput,
    setChecklistInput,
  ] = useState("")

  const [
    openEdit,
    setOpenEdit,
  ] = useState(false)

  const [
    editingItemId,
    setEditingItemId,
  ] = useState<number | null>(
    null
  )

  const [
    editingText,
    setEditingText,
  ] = useState("")

  useEffect(() => {
  if (!selectedSlot) {
    return
  }

  const slotId =
    selectedSlot.id

  async function loadChecklist() {
    try {
      const items =
        await getChecklistApi(
          slotId
        )

      setChecklist(
        slotId,
        items
      )
    } catch (error) {
      console.error(error)
    }
  }

  loadChecklist()
}, [
  selectedSlot?.id
])

  if (!selectedSlot) {
    return (
      <div
        className="
          flex
          h-[400px]
          items-center
          justify-center
          rounded-[24px]
          border
          border-dashed
          border-neutral-300
          bg-neutral-50
          text-neutral-400
          dark:border-neutral-800
          dark:bg-[#12151B]
          dark:text-neutral-500
        "
      >
        Slot details appear here
      </div>
    )
  }
  

  

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500">
              {selectedSlot.time}
            </p>

            <h3
              className="
                mt-2
                text-2xl
                font-semibold
                dark:text-white
              "
            >
              {selectedSlot.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Edit slot"
              title="Edit slot"
              onClick={() =>
                setOpenEdit(
                  true
                )
              }
              className="
                rounded-2xl
                border
                border-neutral-200
                p-3
                transition-all
                hover:bg-neutral-100
                dark:border-neutral-800
                dark:hover:bg-neutral-800
              "
            >
              <Pencil
                size={18}
              />
            </button>

            <button
              aria-label="Delete slot"
              title="Delete slot"
              onClick={async () => {
  try {
    await deleteSlotApi(
      selectedSlot.id
    )

    deleteSlot(
      selectedSlot.id
    )

    closeMobileDrawer()
  } catch (error) {
    console.error(error)
  }
}}
              className="
                rounded-2xl
                border
                border-red-200
                p-3
                text-red-500
                transition-all
                hover:bg-red-50
                dark:border-red-900
                dark:hover:bg-red-950/30
              "
            >
              <Trash2
                size={18}
              />
            </button>
          </div>
        </div>

        {/* Next Actions */}
        <section>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Next 2 Actions
          </h4>

          <div className="space-y-3">
            <input
              value={
                selectedSlot.nextAction1
              }
              onChange={async (e) => {
                const value =
                  e.target.value

                updateNextAction(
                  selectedSlot.id,
                  "nextAction1",
                  value
                )

                try {
                  await updateNextActionsApi(
                    selectedSlot.id,
                    value,
                    selectedSlot.nextAction2
                  )
                } catch (error) {
                  console.error(error)
                }
              }}
              placeholder="Next action 1"
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none dark:border-neutral-800 dark:bg-[#12151B]"
            />

            <input
              value={
                selectedSlot.nextAction2
              }
              onChange={async (e) => {
                const value =
                  e.target.value

                updateNextAction(
                  selectedSlot.id,
                  "nextAction2",
                  value
                )

                try {
                  await updateNextActionsApi(
                    selectedSlot.id,
                    selectedSlot.nextAction1,
                    value
                  )
                } catch (error) {
                  console.error(error)
                }
              }}
              placeholder="Next action 2"
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none dark:border-neutral-800 dark:bg-[#12151B]"
            />
          </div>
        </section>

        {/* Checklist */}
        <section>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Checklist
          </h4>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                value={
                  checklistInput
                }
                onChange={(e) =>
                  setChecklistInput(
                    e.target.value
                  )
                }
                placeholder="Add checklist item"
                className="flex-1 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none dark:border-neutral-800 dark:bg-[#12151B]"
              />

              <button
                aria-label="Add checklist item"
                title="Add checklist item"
                onClick={async () => {
  const trimmed =
    checklistInput.trim()

  if (!trimmed)
    return

  try {
  await createChecklistItemApi(
    selectedSlot.id,
    trimmed
  )

const items =
  await getChecklistApi(
    selectedSlot.id
  )

setChecklist(
  selectedSlot.id,
  items
)

setChecklistInput("")
  } catch (error) {
    console.error(error)
  }
}}
                className="rounded-2xl bg-neutral-900 p-3 text-white dark:bg-white dark:text-black"
              >
                <Plus
                  size={18}
                />
              </button>
            </div>

            {selectedSlot.checklist.map(
              (item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={async () => {
  try {
   await updateChecklistItemApi(
  item.id,
  item.text,
  !item.completed
)

const items =
  await getChecklistApi(
    selectedSlot.id
  )

setChecklist(
  selectedSlot.id,
  items
)
  } catch (error) {
    console.error(error)
  }
}}
                      className={`
                        h-5
                        w-5
                        rounded-full
                        border
                        flex
                        items-center
                        justify-center
                        ${
                          item.completed
                            ? `
                              bg-neutral-900
                              text-white
                              dark:bg-white
                              dark:text-black
                            `
                            : `
                              border-neutral-300
                            `
                        }
                      `}
                    >
                      {item.completed && (
                        <Check
                          size={
                            12
                          }
                        />
                      )}
                    </button>

                    <div className="flex-1">
                      {editingItemId ===
                      item.id ? (
                                        <input
                                            title="Edit checklist item"
  placeholder="Edit checklist item"
  aria-label="Edit checklist item"
                          value={
                            editingText
                          }
                          onChange={(
                            e
                          ) =>
                            setEditingText(
                              e
                                .target
                                .value
                            )
                          }
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 outline-none dark:border-neutral-800 dark:bg-[#12151B]"
                        />
                      ) : (
                        <span
                          className={
                            item.completed
                              ? "line-through opacity-50"
                              : ""
                          }
                        >
                          {
                            item.text
                          }
                        </span>
                      )}
                    </div>

                    {editingItemId ===
                    item.id ? (
                                    <button
  type="button"
  title="Save checklist item"
  aria-label="Save checklist item"
  onClick={async () => {
    const trimmed =
      editingText.trim()

    if (!trimmed)
      return

    try {
      await updateChecklistItemApi(
  item.id,
  trimmed,
  item.completed
)

const items =
  await getChecklistApi(
    selectedSlot.id
  )

setChecklist(
  selectedSlot.id,
  items
)

setEditingItemId(null)
setEditingText("")
    } catch (error) {
      console.error(error)
    }
  }}
  className="rounded-xl p-2 text-green-500"
>
  <Check size={18} />
</button>
                    ) : (
                                    <button
                                        type="button"
  title="Edit checklist item"
  aria-label="Edit checklist item"
                        onClick={() => {
                          setEditingItemId(
                            item.id
                          )

                          setEditingText(
                            item.text
                          )
                        }}
                        className="rounded-xl p-2 text-neutral-500"
                      >
                        <Pencil
                          size={
                            16
                          }
                        />
                      </button>
                    )}

                            <button
  type="button"
  title="Delete checklist item"
  aria-label="Delete checklist item"
  onClick={async () => {
    try {
      await deleteChecklistItemApi(
  item.id
)

const items =
  await getChecklistApi(
    selectedSlot.id
  )

setChecklist(
  selectedSlot.id,
  items
)
    } catch (error) {
      console.error(error)
    }
  }}
  className="rounded-xl p-2 text-red-500"
>
                      <Trash2
                        size={16}
                      />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Notes */}
        <section>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Notes
          </h4>

          <textarea
            value={
              selectedSlot.notes
            }
            onChange={async (e) => {
              const value =
                e.target.value

              updateNotes(
                selectedSlot.id,
                value
              )

              try {
                await updateSlotNotesApi(
                  selectedSlot.id,
                  value
                )
              } catch (error) {
                console.error(error)
              }
            }}
            placeholder="Write notes..."
            className="min-h-[180px] w-full resize-none rounded-[24px] border border-neutral-200 bg-neutral-50 p-4 outline-none dark:border-neutral-800 dark:bg-[#12151B]"
          />
        </section>
      </div>

      <EditSlotModal
        isOpen={openEdit}
        title={
          selectedSlot.title
        }
        time={
          selectedSlot.time
        }
        onClose={() =>
          setOpenEdit(
            false
          )
        }
        onSave={async (
  title,
  time
) => {
  try {
    await updateSlotApi(
      selectedSlot.id,
      title,
      time
    )

    updateSlot(
      selectedSlot.id,
      title,
      time
    )
  } catch (error) {
    console.error(error)
  }
}}
      />
    </>
  )
}

export default SlotDetails