"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import Toast from "../../components/Toast"

// Define the toast types
export type ToastType = "success" | "error" | "info" | "warning"

// Define the context interface
interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void
  hideToast: () => void
}

// Create the context with undefined default value
const ToastContext = createContext<ToastContextType | undefined>(undefined)

// Custom hook to use the toast context
export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Props for the ToastProvider component
interface ToastProviderProps {
  children: ReactNode
}

// ToastProvider component
export function ToastProvider({ children }: ToastProviderProps) {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState<ToastType>("success")
  const [duration, setDuration] = useState(3000)

  // Function to show a toast
  const showToast = (msg: string, toastType: ToastType = "success", toastDuration = 3000) => {
    setMessage(msg)
    setType(toastType)
    setDuration(toastDuration)
    setVisible(true)
  }

  // Function to hide the toast
  const hideToast = () => {
    setVisible(false)
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast
        visible={visible}
        message={message}
        type={type}
        duration={duration}
        onDismiss={hideToast}
      />
    </ToastContext.Provider>
  )
}
