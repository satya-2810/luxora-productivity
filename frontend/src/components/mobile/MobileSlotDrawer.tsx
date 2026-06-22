import {
  AnimatePresence,
  motion,
} from "framer-motion"

import SlotDetails from "../details/SlotDetails"

type Props = {
  open: boolean
  onClose: () => void
}

function MobileSlotDrawer({
  open,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-40
              bg-black/25
              backdrop-blur-sm
              lg:hidden
            "
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{
              y: "100%",
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: "100%",
            }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 260,
            }}
            className="
              fixed
              bottom-0
              left-0
              right-0
              z-50
              max-h-[88vh]
              overflow-y-auto
              rounded-t-[36px]
              border-t
              border-neutral-200
              bg-white
              p-6
              shadow-2xl
              dark:border-neutral-800
              dark:bg-[#181C22]
              lg:hidden
            "
          >
            {/* Grab Handle */}
            <div className="mb-5 flex justify-center">
              <div
                className="
                  h-1.5
                  w-14
                  rounded-full
                  bg-neutral-300
                  dark:bg-neutral-700
                "
              />
            </div>

            <SlotDetails />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileSlotDrawer