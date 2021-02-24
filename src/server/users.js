import {User, Admin} from '@/models'

export const users = [
  new Admin(1, 'Ann', 28),
  new Admin(2, 'Valentine', 16),
  new User(3, 'Vladimir', 38),
  new User(4, 'Sam', 23),
  new User(5, 'Andrey', 18),
  new Admin(6, 'Kath'),
  new Admin(7, 'Suzi', 24)
]