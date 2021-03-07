import {createFormData} from './formData'

describe('formData preparation', () => {
  it('should return formData object with certain keys', () => {
    const mockFormData = {
      id: '15:00 Wed',
      meetingName: 'Daily meeting',
      participants: ['Andrey', 'Suzi', 'Ann', 'Valentine'],
      selectedDay: 'Wednesday',
      selectedTime: '15:00'
    }

    const formData = createFormData(
      'Daily meeting',
      'Wednesday',
      '15:00',
      '15:00 Wed'
    )

    formData.participants = ['Andrey', 'Suzi', 'Ann', 'Valentine']

    expect(formData).toEqual(mockFormData)
  })
})