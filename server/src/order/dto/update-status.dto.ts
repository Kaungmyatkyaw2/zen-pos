import { OrderlineStatus } from '../../../src/orderline/type';

export interface UpdateOrderStatus {
  updateStatus: OrderlineStatus;
  whichStatus: OrderlineStatus;
}
