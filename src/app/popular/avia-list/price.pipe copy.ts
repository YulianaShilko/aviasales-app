import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pricecopy' })

export class PriceCopyPipe implements PipeTransform {
    
  transform(prices: any, checkSecond: boolean): any {
    if(checkSecond == null) {
      return prices;
    } else if (checkSecond == true) {
console.log('second')
      return prices.filter(function(price) {
        if (price.price > 201) {
          return price.price
        }
        
      })      
    }
  }
}