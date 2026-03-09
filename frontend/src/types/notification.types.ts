export interface ICreateNotification {
  name: string;
  subject: string;
  email: string;
  message: string;
}

export interface ICreateNotificationResponse {
  message: string;
}
