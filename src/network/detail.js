import {request} from './request'
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
} 

export class Goods {
    constructor(itemInfo, columns, service) {
        this.title = itemInfo.title;
        this.price = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = service;
    }
}

// export class Shop {
//     constructor(shopInfo) {
//         this.shopLogo = shopInfo.shopLogo;
//         this.
//     }
// }