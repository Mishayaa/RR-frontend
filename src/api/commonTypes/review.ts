import { User } from "./user"

export type Review = {
  id: number,
  user: User,
  restaurantId: number,
  review: string,
  rating: number,
}
