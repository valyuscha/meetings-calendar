export const createFormData = (eventName, selectedDay, selectedTime, id) => {
  const formData = {}
  formData.meetingName = eventName
  formData.selectedDay = selectedDay
  formData.selectedTime = selectedTime
  formData.participants = []
  formData.id = id
  return formData
}