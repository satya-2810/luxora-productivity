import { 
  useState,
  useEffect
 } from "react"
import { Plus } from "lucide-react"

import Header from "./Header"
import SlotCard from "../cards/SlotCard"
import BrainDumpCard from "../cards/BrainDumpCard"
import CreateSlotModal from "../ui/CreateSlotModal"

import SlotDetails from "../details/SlotDetails"
import MobileSlotDrawer from "../mobile/MobileSlotDrawer"

import {
  useSlotStore,
} from "../../store/slotStore"

import {
  getSlotsApi,
  createSlotApi,
} from "../../api/slotApi"

import {
  useBrainDumpStore,
} from "../../store/brainDumpStore"

import {
  createBrainDumpApi,
  getBrainDumpsApi,
  deleteBrainDumpApi,
} from "../../api/brainDumpApi"

import useReminders from "../../hooks/useReminders"

import {
  useWorkspaceStore,
} from "../../store/workspaceStore"

import {
  createWorkspaceApi,
} from "../../api/workspaceApi"

function DashboardLayout() {
  const {
    slots,
    addSlotFromThought,
    setSlots,
    mobileDrawerOpen,
    closeMobileDrawer,
  } = useSlotStore()

  const {
    thoughts,
    setThoughts,
    addThought,
    removeThought,
  } = useBrainDumpStore()

  const {
  workspaceId,
  setWorkspaceId,
} = useWorkspaceStore()

  useReminders(slots)

  const [openModal, setOpenModal] =
    useState(false)

  const [
    thoughtInput,
    setThoughtInput,
  ] = useState("")

  type ApiSlot = {
  id: number
  workspace_id: number

  title: string
  time: string

  next_action_1: string
  next_action_2: string

  notes: string
  }

  type ApiBrainDump = {
  id: number
  workspace_id: number
  text: string
}
  
  async function initializeWorkspace() {
  if (workspaceId)
    return workspaceId

  const storageKey =
    "luxora-workspace-key"

  let workspaceKey =
    localStorage.getItem(
      storageKey
    )

  if (!workspaceKey) {
    workspaceKey =
      crypto.randomUUID()

    localStorage.setItem(
      storageKey,
      workspaceKey
    )
  }

  const workspace =
    await createWorkspaceApi(
      workspaceKey
    )

  setWorkspaceId(
    workspace.workspace_id
  )

  return workspace.workspace_id
}

  useEffect(() => {
  async function initialize() {
    try {
      const workspaceId =
        await initializeWorkspace()

      const slots =
        await getSlotsApi(
          workspaceId!
        )

      const mappedSlots =
        slots.map(
          (slot: ApiSlot) => ({
            id: slot.id,
            title: slot.title,
            time: slot.time,
            nextAction1:
              slot.next_action_1,
            nextAction2:
              slot.next_action_2,
            checklist: [],
            notes: slot.notes,
          })
        )

      setSlots(
        mappedSlots
      )

      const brainDumps =
  await getBrainDumpsApi(
    workspaceId
  )

const mappedThoughts =
  brainDumps.map(
    (
      thought:
      ApiBrainDump
    ) => ({
      id: thought.id,
      text:
        thought.text,
    })
  )

setThoughts(
  mappedThoughts
)
    } catch (error) {
      console.error(error)
    }
  }

  initialize()
}, [])

  return (
    <>
      <main
        className="
          min-h-screen
          bg-[#F7F7F5]
          px-5
          py-6
          transition-colors
          duration-300
          dark:bg-[#0F1115]
          md:px-8
          lg:px-12
        "
      >
        <div className="mx-auto max-w-[1600px]">
          <Header />

          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            {/* Left Side */}
            <div className="space-y-6">
              {/* Slots */}
              <section
                className="
                  rounded-[32px]
                  border
                  border-neutral-200
                  bg-white
                  p-6
                  shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                  transition-all
                  duration-300
                  dark:border-neutral-800
                  dark:bg-[#181C22]
                "
              >
                <div className="mb-5 flex items-center justify-between">
                  <h2
                    className="
                      text-xl
                      font-semibold
                      text-neutral-900
                      dark:text-neutral-100
                    "
                  >
                    Daily Slots
                  </h2>

                  <button
                    onClick={() =>
                      setOpenModal(true)
                    }
                    className="
                      rounded-2xl
                      bg-neutral-900
                      px-5
                      py-2.5
                      text-sm
                      font-medium
                      text-white
                      transition-all
                      duration-150
                      hover:scale-[1.02]
                      hover:opacity-90
                      active:scale-95
                      dark:bg-white
                      dark:text-black
                    "
                  >
                    + Add Slot
                  </button>
                </div>

                <div className="space-y-4">
                  {slots.length === 0 ? (
                    <div
                      className="
                        flex
                        h-[300px]
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
                      "
                    >
                      Your slots will
                      appear here
                    </div>
                  ) : (
                    slots.map((slot) => (
                      <SlotCard
                        key={slot.id}
                        {...slot}
                      />
                    ))
                  )}
                </div>
              </section>

              {/* Brain Dump */}
              <section
                className="
                  rounded-[32px]
                  border
                  border-neutral-200
                  bg-white
                  p-6
                  shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                  transition-all
                  duration-300
                  dark:border-neutral-800
                  dark:bg-[#181C22]
                "
              >
                <h2
                  className="
                    mb-4
                    text-xl
                    font-semibold
                    text-neutral-900
                    dark:text-neutral-100
                  "
                >
                  Brain Dump
                </h2>

                <div className="mb-4 flex gap-2">
                  <input
                    value={thoughtInput}
                    onChange={(e) =>
                      setThoughtInput(
                        e.target.value
                      )
                    }
                    placeholder="Quick thought..."
                    className="
                      flex-1
                      rounded-2xl
                      border
                      border-neutral-200
                      bg-neutral-50
                      px-4
                      py-3
                      outline-none
                      transition-all
                      focus:border-neutral-400
                      dark:border-neutral-800
                      dark:bg-[#12151B]
                    "
                  />

                  <button
                    aria-label="Add thought"
                    title="Add thought"
                    onClick={async () => {
  const trimmed =
    thoughtInput.trim()

  if (!trimmed)
    return

  try {
    const thought =
      await createBrainDumpApi(
        workspaceId!,
        trimmed
      )

    addThought({
      id: thought.id,
      text:
        thought.text,
    })

    setThoughtInput("")
  } catch (error) {
    console.error(error)
  }
}}
                    className="
                      rounded-2xl
                      bg-neutral-900
                      p-3
                      text-white
                      transition-transform
                      duration-150
                      hover:scale-[1.02]
                      active:scale-95
                      dark:bg-white
                      dark:text-black
                    "
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div className="space-y-3">
                  {thoughts.length ===
                  0 ? (
                    <div
                      className="
                        rounded-[24px]
                        border
                        border-dashed
                        border-neutral-300
                        bg-neutral-50
                        p-5
                        text-neutral-400
                        dark:border-neutral-800
                        dark:bg-[#12151B]
                        dark:text-neutral-500
                      "
                    >
                      Quick thoughts,
                      ideas &
                      reminders
                    </div>
                  ) : (
                    thoughts.map(
                      (thought) => (
                        <BrainDumpCard
                          key={
                            thought.id
                          }
                          text={
                            thought.text
                          }
                          onConvert={async () => {
                            try {
                              await createSlotApi(
                                workspaceId!,
                                thought.text,
                                "No Time"
                              )

                              const slots =
                                await getSlotsApi(
                                  workspaceId!
                                )

                              const mappedSlots =
                                slots.map(
                                  (slot: ApiSlot) => ({
                                    id: slot.id,
                                    title:
                                      slot.title,
                                    time:
                                      slot.time,
                                    nextAction1:
                                      slot.next_action_1,
                                    nextAction2:
                                      slot.next_action_2,
                                    checklist: [],
                                    notes:
                                      slot.notes,
                                  })
                                )

                              setSlots(
                                mappedSlots
                              )

                              await deleteBrainDumpApi(
                                thought.id
                              )

                              removeThought(
                                thought.id
                              )
                            } catch (error) {
                              console.error(error)
                            }
                          }}
                          onDelete={async () => {
                            try {
                              await deleteBrainDumpApi(
                                thought.id
                              )

                              removeThought(
                                thought.id
                              )
                            } catch (error) {
                              console.error(error)
                            }
                          }}
                        />
                      )
                    )
                  )}
                </div>
              </section>
            </div>

            {/* Right Panel */}
            <aside
              className="
                rounded-[32px]
                border
                border-neutral-200
                bg-white
                p-6
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                transition-all
                duration-300
                dark:border-neutral-800
                dark:bg-[#181C22]
              "
            >
              <h2
                className="
                  mb-5
                  text-xl
                  font-semibold
                  text-neutral-900
                  dark:text-neutral-100
                "
              >
                Details
              </h2>

              {/* Desktop */}
              <div className="hidden lg:block">
                <SlotDetails />
              </div>

              {/* Mobile */}
              <div className="lg:hidden">
                <div
                  className="
                    flex
                    h-[200px]
                    items-center
                    justify-center
                    rounded-[24px]
                    border
                    border-dashed
                    border-neutral-300
                    text-neutral-400
                    dark:border-neutral-800
                  "
                >
                  Tap a slot to
                  open details
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <MobileSlotDrawer
        open={
          mobileDrawerOpen
        }
        onClose={
          closeMobileDrawer
        }
      />

      <CreateSlotModal
  isOpen={openModal}
  onClose={() =>
    setOpenModal(false)
  }
  onCreate={async (
    title,
    time
  ) => {
    try {
        await createSlotApi(
  workspaceId!,
  title,
  time
)

const slots =
  await getSlotsApi(
    workspaceId!
  )

const mappedSlots =
  slots.map(
    (slot: ApiSlot) => ({
      id: slot.id,

      title:
        slot.title,

      time:
        slot.time,

      nextAction1:
        slot.next_action_1,

      nextAction2:
        slot.next_action_2,

      checklist: [],

      notes:
        slot.notes,
    })
  )

setSlots(
  mappedSlots
)
    } catch (
      error
    ) {
      console.error(
        error
      )
    }
  }}
/>
    </>
  )
}

export default DashboardLayout