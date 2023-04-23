import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateOrderlineDto } from './dto';

@Injectable()
export class OrderlineService {
    constructor(private prisma : PrismaService){}

    async updateOrderline(id : number,dto : UpdateOrderlineDto){
        const updatedOrderline = await this.prisma.orderlines.update({
            where : {
                id
            },
            data : {
                status : dto.status
            }
        })

        if (updatedOrderline) {
            return updatedOrderline
        }
    }

}
