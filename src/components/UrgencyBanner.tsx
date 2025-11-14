import { motion } from 'framer-motion'

type UrgencyBannerProps = {
  timeRemaining: number
}

function UrgencyBanner({ timeRemaining }: UrgencyBannerProps) {
  const hours = Math.floor(timeRemaining / 3600)
  const minutes = Math.floor((timeRemaining % 3600) / 60)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-r from-danger to-danger/80 text-white py-2 px-4 text-center shadow-lg"
    >
      <div className="flex items-center justify-center gap-2 flex-wrap text-xs md:text-sm">
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-base"
        >
          ⚠️
        </motion.span>
        <span className="font-bold">
          ENEM É DOMINGO - FALTAM {hours}h {minutes}m
        </span>
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          className="text-base"
        >
          ⚠️
        </motion.span>
        <span className="hidden md:inline">|</span>
        <span className="text-xs">
          Oferta especial: 50% OFF expira em 24h
        </span>
      </div>
    </motion.div>
  )
}

export default UrgencyBanner
