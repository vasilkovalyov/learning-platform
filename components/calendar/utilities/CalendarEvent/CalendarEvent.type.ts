export interface ICalendarEventOptions {
  id: string
  title: string
  description: string
  duration: {
    from: Date
    to: Date
  }
}

export interface ICalendarEvent {
  id: string
  title: string
  duration: {
    from: Date
    to: Date
  }
  type: 'personal' | 'group'
}
