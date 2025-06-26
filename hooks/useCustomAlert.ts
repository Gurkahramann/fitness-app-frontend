"use client"

import { useState } from "react"
import type { AlertButton } from "../components/CustomAlert"

interface AlertConfig {
  title: string
  message?: string
  buttons: AlertButton[]
  icon?: string
  iconColor?: string
}

export function useCustomAlert() {
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null)
  const [visible, setVisible] = useState(false)

  const showAlert = (config: AlertConfig) => {
    setAlertConfig(config)
    setVisible(true)
  }

  const hideAlert = () => {
    setVisible(false)
    setTimeout(() => {
      setAlertConfig(null)
    }, 200)
  }

  const alert = (
    title: string,
    message?: string,
    buttons: AlertButton[] = [{ text: "OK" }],
    options?: { icon?: string; iconColor?: string },
  ) => {
    showAlert({
      title,
      message,
      buttons,
      icon: options?.icon,
      iconColor: options?.iconColor,
    })
  }

  return {
    alert,
    alertConfig,
    visible,
    hideAlert,
  }
}
