import { useToast, Toast, ToastTitle } from "@/components/ui/toast";

export function useShowToast() {
  const toast = useToast();

  const generateToast = (
    toastId: string,
    type: "error" | "warning" | "success" | "info" | "muted" | undefined,
    message: string
  ) => {
    if (toast.isActive(toastId)) {
      return;
    }

    toast.show({
      id: toastId,
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        return (
          <Toast action={type} variant="solid" nativeID={id}>
            <ToastTitle>{message}</ToastTitle>
          </Toast>
        );
      },
    });
  };

  return {
    generateToast,
  };
}
