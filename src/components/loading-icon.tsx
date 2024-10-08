export const LoadingIcon = ({
  type = "primary",
  loading = false,
}: {
  type?: "primary" | "secondary" | "error" | "warning" | "success" | "white"
  loading?: boolean
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="size-5 animate-spin"
    >
      <path
        d="M463.9 376c7.6 4.4 17.5 1.8 21.4-6.1c17.1-34.3 26.7-73 26.7-113.9C512 120 405.9 8.8 272 .5c-8.8-.5-16 6.7-16 15.5s7.2 15.9 16 16.6C388.2 40.8 480 137.7 480 256c0 35.1-8.1 68.3-22.5 97.9c-3.9 8-1.3 17.7 6.4 22.1z"
        className={
          loading
            ? "fill-white"
            : type == "secondary"
              ? "fill-slate-600"
              : type == "error"
                ? "fill-radical-red-600"
                : type == "warning"
                  ? "fill-coral"
                  : type == "success"
                    ? "fill-caribbean-green-600"
                    : type == "white"
                      ? "fill-white"
                      : "fill-electric-violet"
        }
      />
    </svg>
  )
}
