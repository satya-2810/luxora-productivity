import { useState } from "react"

import LuxuryTimePicker from "./LuxuryTimePicker"

type Props = {
  isOpen: boolean
  title: string
  time: string

  onClose: () => void

  onSave: (
    title: string,
    time: string
  ) => void
}

function convertTimeTo24Hour(
  timeString: string
) {
  if (
    timeString ===
    "No Time"
  ) {
    return "09:00"
  }

  const [
    timePart,
    period,
  ] = timeString.split(
    " "
  )

  const [
    hour,
    minute,
  ] = timePart.split(
    ":"
  )

  let hourNum =
    Number(hour)

  if (
    period === "PM" &&
    hourNum !== 12
  ) {
    hourNum += 12
  }

  if (
    period === "AM" &&
    hourNum === 12
  ) {
    hourNum = 0
  }

  return `${String(
    hourNum
  ).padStart(
    2,
    "0"
  )}:${minute}`
}

function EditSlotModal({
  isOpen,
  title,
  time,
  onClose,
  onSave,
}: Props) {
  const [
    localTitle,
    setLocalTitle,
  ] = useState(title)

  const [
    localTime,
    setLocalTime,
  ] = useState(
    convertTimeTo24Hour(
      time
    )
  )

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
          Edit Slot
        </h2>

        <div className="space-y-4">
          <label
            className="
              block
              text-sm
              font-medium
              text-neutral-600
              dark:text-neutral-300
            "
          >
            Slot Title

            <input
              title="Slot title"
              placeholder="Enter slot title"
              value={
                localTitle
              }
              onChange={(
                e
              ) =>
                setLocalTitle(
                  e.target
                    .value
                )
              }
              className="
                mt-2
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
          </label>

          <label
            className="
              block
              text-sm
              font-medium
              text-neutral-600
              dark:text-neutral-300
            "
          >
            Time

            <div className="mt-2">
              <LuxuryTimePicker
                value={
                  localTime
                }
                onChange={
                  setLocalTime
                }
              />
            </div>
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={
              onClose
            }
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
              onSave(
                localTitle,
                localTime
              )

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
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditSlotModal