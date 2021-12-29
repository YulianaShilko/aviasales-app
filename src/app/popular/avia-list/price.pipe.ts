import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'price' })

export class PricePipe implements PipeTransform {
    
  transform(prices: any, checkFirst: boolean): any {
    if(checkFirst == null ) {
      return prices;
    } else if (checkFirst == true) {
      console.log('first')
      return prices.filter(function(price){
        
        if (price.price > 0 && price.price < 200) {
          return price.price
        }
        
      })      
    } 
  }
}