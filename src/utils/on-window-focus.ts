// Define the type for the callback function
type VisibilityChangeCallback = () => void

export const onWindowFocus = (
  callback: VisibilityChangeCallback
): (() => void) => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      callback() // Run the provided callback when the window gains focus
    }
  }

  // Add the event listener
  document.addEventListener("visibilitychange", handleVisibilityChange)

  // Cleanup function to remove the listener if needed
  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange)
  }
}
