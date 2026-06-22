import { useEffect } from "react"

type Slot = {
  id: number
  title: string
  time: string
}

const firedReminders =
  new Set<string>()

function convertTo24Hour(
  timeString: string
) {
  if (
    timeString ===
    "No Time"
  ) {
    return null
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

  return {
    hours: hourNum,
    minutes:
      Number(minute),
  }
}

function showNotification(
  title: string,
  body: string
) {
  const notification =
    new Notification(
      title,
      {
        body,
        icon:
          "/vite.svg",
      }
    )

  notification.onclick =
    () => {
      window.focus()
    }
}

function useReminders(
  slots: Slot[]
) {
  useEffect(() => {
    if (
      !("Notification" in
      window)
    ) {
      return
    }

    if (
      Notification
        .permission ===
      "default"
    ) {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    const interval =
      setInterval(() => {
        if (
          Notification.permission !==
          "granted"
        ) {
          return
        }

        const now =
          new Date()

        slots.forEach(
          (slot) => {
            const parsedTime =
              convertTo24Hour(
                slot.time
              )

            if (
              !parsedTime
            ) {
              return
            }

            const slotDate =
              new Date()

            slotDate.setHours(
              parsedTime.hours
            )

            slotDate.setMinutes(
              parsedTime.minutes
            )

            slotDate.setSeconds(
              0
            )

            const diffMinutes =
              Math.floor(
                (
                  slotDate.getTime() -
                  now.getTime()
                ) /
                  1000 /
                  60
              )

            const beforeKey =
              `${slot.id}-before`

            const nowKey =
              `${slot.id}-now`

            const missedKey =
              `${slot.id}-missed`

            // 5 min before
            if (
              diffMinutes ===
                5 &&
              !firedReminders.has(
                beforeKey
              )
            ) {
              showNotification(
                "Upcoming Task",
                `${slot.title} starts in 5 minutes`
              )

              firedReminders.add(
                beforeKey
              )
            }

            // Exact time
            if (
              diffMinutes ===
                0 &&
              !firedReminders.has(
                nowKey
              )
            ) {
              showNotification(
                "Luxora Reminder",
                `Time for ${slot.title}`
              )

              firedReminders.add(
                nowKey
              )
            }

            // Missed task
            if (
              diffMinutes <
                -10 &&
              !firedReminders.has(
                missedKey
              )
            ) {
              showNotification(
                "Missed Task",
                `You missed ${slot.title}`
              )

              firedReminders.add(
                missedKey
              )
            }
          }
        )
      }, 10000)

    return () =>
      clearInterval(
        interval
      )
  }, [slots])
}

export default useReminders