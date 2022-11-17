import notification, { NotificationPlacement } from 'antd/lib/notification'

export const openNotification = (placement: NotificationPlacement) => {
  notification.info({
    message: `Data of user has been saved successful`,
    duration: 3,
    placement,
  })
}
