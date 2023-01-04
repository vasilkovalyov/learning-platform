// import notification, { NotificationPlacement } from 'antd/lib/notification'

export interface INotification {
  message: string
  description?: string
  duration: number
}
const defaultProps: INotification = {
  message: `Data of user has been saved successful`,
  duration: 3,
}

// export const openNotification = (placement: NotificationPlacement, props: INotification = defaultProps) => {
//   notification.info({
//     message: props.message,
//     description: props.description,
//     duration: props.duration,
//     placement,
//   })
// }
