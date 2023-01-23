import { toast, ToastOptions } from "react-hot-toast";

type Status = 'success' | 'error' | 'loading'

interface ToastArgs {
  type: Status
  message: string
  notificationId?: string
}
export default function renderToast({
  type,
  message,
  notificationId
}: ToastArgs): string | undefined {
  const config:ToastOptions = {position:'top-right',id:notificationId}
  
  switch (type) {
    case 'success':
      return toast.success(message,config);
    case 'error':
     return toast.error(message,config);
    case 'loading':
      return toast.loading(message,config);
    default:
      break;
  }
}
