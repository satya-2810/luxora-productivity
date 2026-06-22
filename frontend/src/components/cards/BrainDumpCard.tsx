import { motion } from "framer-motion"
import {
  Trash2,
  ArrowUpRight,
} from "lucide-react"

type Props = {
  text: string

  onDelete: () => void
  onConvert: () => void
}

function BrainDumpCard({
  text,
  onDelete,
  onConvert,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="
        group
  rounded-[24px]
  border
  border-neutral-200
  bg-white
  p-4
  shadow-sm
  transition-all
  duration-300
  hover:-translate-y-1
  hover:shadow-lg
  dark:border-neutral-800
  dark:bg-[#181C22]
      "
    >
      <p className="text-sm dark:text-neutral-200">
        {text}
      </p>

      <div className="flex items-center gap-2 ">
        <button
          aria-label="Convert to slot"
          title="Convert to slot"
          onClick={onConvert}
          className="
            rounded-xl
            p-2
            text-neutral-400
            transition-all
            hover:bg-neutral-100
            dark:hover:bg-neutral-800
            transition-transform
duration-150
active:scale-95
hover:scale-[1.02]
          "
        >
          <ArrowUpRight size={16} />
        </button>

        <button
          aria-label="Delete thought"
          title="Delete thought"
          onClick={onDelete}
          className="
            rounded-xl
            p-2
            text-neutral-400
            transition-all
            hover:bg-neutral-100
            dark:hover:bg-neutral-800
            transition-transform
duration-150
active:scale-95
hover:scale-[1.02]
          "
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  )
}

export default BrainDumpCard