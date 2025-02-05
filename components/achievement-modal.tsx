// components/achievement-modal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { Award } from "lucide-react"

interface AchievementModalProps {
  title: string
  onClose: () => void
}

export function AchievementModal({ title, onClose }: AchievementModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800/90 text-white border border-blue-500/20 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">{title}</DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-yellow-400 mb-4"
            >
              <Award size={64} />
            </motion.div>
            <p className="text-lg">Congratulations on your achievement!</p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

