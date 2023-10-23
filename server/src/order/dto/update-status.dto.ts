import { OrderlineStatus } from '../../orderline/type';

export interface UpdateOrderStatus {
  updateStatus: OrderlineStatus;
  whichStatus: OrderlineStatus;
}
