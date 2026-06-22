import { motion } from "framer-motion"

import type { Slot } from "../../store/slotStore"

import {
  useSlotStore,
} from "../../store/slotStore"

type Props = Slot

function SlotCard(
  slot: Props
) {
  const {
    selectedSlot,
    selectSlot,
    openMobileDrawer,
  } = useSlotStore()

  const isSelected =
    selectedSlot?.id === slot.id

  return (
    <motion.button
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.2,
      }}
      onClick={() => {
        selectSlot(slot)

        if (
          window.innerWidth <
          1024
        ) {
          openMobileDrawer()
        }
      }}
      className={`
        group
  cursor-pointer
  rounded-[28px]
  border
  border-neutral-200
  bg-white
  p-5
  shadow-sm
  transition-all
  duration-300
  hover:-translate-y-1
  hover:shadow-xl
  dark:border-neutral-800
  dark:bg-[#181C22]

        ${
          isSelected
  ? `
      border-neutral-900
      bg-neutral-100
      shadow-lg
      dark:border-white
      dark:bg-neutral-900
    `
  : `
      border-neutral-200
      bg-white
      dark:border-neutral-800
      dark:bg-[#181C22]
    `
        }
      `}
    >
      <p className="text-sm opacity-70">
        {slot.time}
      </p>

      <h3 className="mt-2 text-lg font-semibold">
        {slot.title}
      </h3>
    </motion.button>
  )
}

export default SlotCard