import { useState } from "react"

import LuxuryTimePicker from "./LuxuryTimePicker"

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreate: (
    title: string,
    time: string
  ) => void
}

function CreateSlotModal({
  isOpen,
  onClose,
  onCreate,
}: Props) {
  const [
    title,
    setTitle,
  ] = useState("")

  const [time, setTime] =
    useState("09:00")

  if (!isOpen)
    return null

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/30
        px-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-md
          scale-100
          rounded-[36px]
          bg-white
          p-6
          shadow-[0_30px_80px_rgba(0,0,0,0.18)]
          transition-all
          duration-300
          dark:bg-[#181C22]
        "
      >
        <h2
          className="
            mb-5
            text-2xl
            font-semibold
            dark:text-white
          "
        >
          Create Slot
        </h2>

        <div className="space-y-4">
          <input
            title="Slot title"
            placeholder="Slot title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="
              w-full
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

          <LuxuryTimePicker
            value={time}
            onChange={setTime}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              onClose()
            }}
            className="
              rounded-2xl
              border
              px-5
              py-3
              transition-transform
              duration-150
              hover:scale-[1.02]
              active:scale-95
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              if (
                !title.trim()
              )
                return

              onCreate(
                title,
                time
              )

              setTitle("")
              setTime("09:00")

              onClose()
            }}
            className="
              rounded-2xl
              bg-neutral-900
              px-5
              py-3
              text-white
              transition-transform
              duration-150
              hover:scale-[1.02]
              active:scale-95
              dark:bg-white
              dark:text-black
            "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateSlotModal