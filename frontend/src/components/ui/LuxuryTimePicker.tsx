type Props = {
  value: string
  onChange: (
    time: string
  ) => void
}

function LuxuryTimePicker({
  value,
  onChange,
}: Props) {
  const [
    hour = "09",
    minute = "00",
  ] = value.split(":")

  const hourNumber =
    Number(hour)

  const isPM =
    hourNumber >= 12

  const displayHour =
    String(
      hourNumber % 12 || 12
    ).padStart(2, "0")

  const period = isPM
    ? "PM"
    : "AM"

  const handleHourChange =
    (
      selectedHour: string
    ) => {
      let hourNum =
        Number(
          selectedHour
        )

      if (
        period ===
          "PM" &&
        hourNum !== 12
      ) {
        hourNum += 12
      }

      if (
        period ===
          "AM" &&
        hourNum === 12
      ) {
        hourNum = 0
      }

      onChange(
        `${String(
          hourNum
        ).padStart(
          2,
          "0"
        )}:${minute}`
      )
    }

  const handleMinuteChange =
    (
      selectedMinute: string
    ) => {
      onChange(
        `${hour}:${selectedMinute}`
      )
    }

  const handlePeriodChange =
    (
      selectedPeriod:
        | "AM"
        | "PM"
    ) => {
      let hourNum =
        Number(hour)

      if (
        selectedPeriod ===
          "PM" &&
        hourNum < 12
      ) {
        hourNum += 12
      }

      if (
        selectedPeriod ===
          "AM" &&
        hourNum >= 12
      ) {
        hourNum -= 12
      }

      onChange(
        `${String(
          hourNum
        ).padStart(
          2,
          "0"
        )}:${minute}`
      )
    }

  return (
    <div className="flex items-center gap-3">
      {/* Hour */}
      <select
        title="Hour"
        value={
          displayHour
        }
        onChange={(e) =>
          handleHourChange(
            e.target.value
          )
        }
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
          dark:border-neutral-800
          dark:bg-[#12151B]
        "
      >
        {Array.from(
          { length: 12 },
          (_, i) => {
            const h =
              String(
                i + 1
              ).padStart(
                2,
                "0"
              )

            return (
              <option
                key={h}
                value={h}
              >
                {h}
              </option>
            )
          }
        )}
      </select>

      <span className="text-xl font-semibold">
        :
      </span>

      {/* Minute */}
      <select
        title="Minute"
        value={minute}
        onChange={(e) =>
          handleMinuteChange(
            e.target.value
          )
        }
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
          dark:border-neutral-800
          dark:bg-[#12151B]
        "
      >
        {Array.from(
          { length: 60 },
          (_, i) => {
            const m =
              String(
                i
              ).padStart(
                2,
                "0"
              )

            return (
              <option
                key={m}
                value={m}
              >
                {m}
              </option>
            )
          }
        )}
      </select>

      {/* AM PM */}
      <select
        title="AM PM"
        value={period}
        onChange={(e) =>
          handlePeriodChange(
            e.target
              .value as
              | "AM"
              | "PM"
          )
        }
        className="
          rounded-2xl
          border
          border-neutral-200
          bg-neutral-50
          px-4
          py-3
          outline-none
          transition-all
          dark:border-neutral-800
          dark:bg-[#12151B]
        "
      >
        <option value="AM">
          AM
        </option>

        <option value="PM">
          PM
        </option>
      </select>
    </div>
  )
}

export default LuxuryTimePicker