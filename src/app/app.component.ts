import { Component } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PizzaOrderingSystem';
  public price = 0;
  public listOfPizzas: Pizza[] = [];


  public toppingAdded(pizzaSize, toppingPrice, toppingType, id, toppingName) {
    const isCheckBoxSelected = (document.getElementById(id) as HTMLInputElement).checked;   
    this.listOfPizzas.forEach(item => {
      if (isCheckBoxSelected) {
        if (item.size === pizzaSize) {
          item.pizzaToppings = [...item.pizzaToppings, { name: toppingName, type: toppingType, price: toppingPrice }]
        }
      }
      else {
        item.pizzaToppings = item.pizzaToppings.filter(topping => topping.name !== toppingName)
      }
    })
    this.calculateTotalPrice();
  }

  public addPizza(pizzaSize) {
    const pizza = this.listOfPizzas.find(item => item.size === pizzaSize);
    if (pizza !== undefined) {
      this.listOfPizzas.push(_.clone(pizza));
    } else {
      this.listOfPizzas.push({ size: pizzaSize, pizzaToppings: [], price: Number(PizzaSize[pizzaSize]) })
    }
    this.calculateTotalPrice();
  }

  public calculateTotalPrice() {
    const listOfSmallPizzas = this.listOfPizzas.filter(t => String(t.size) === 'small');
    const pricePerSmallPizza = listOfSmallPizzas.length === 0 
                               ? 0
                               : this.calculatePriceOfPizza(listOfSmallPizzas[0]);
    const totalCostOfSmallPizzas = listOfSmallPizzas.length * pricePerSmallPizza;
    

    const listOfMediumPizzas = this.listOfPizzas.filter(t => String(t.size) === 'medium');
    console.log(listOfMediumPizzas)
    const totalCostOfMediumPizzas = listOfMediumPizzas.length === 0 
                                    ? 0 
                                    :this.calculateMediumPizzaPrice(listOfMediumPizzas);

    const listOfLargePizzas = this.listOfPizzas.filter(t => String(t.size) === 'large');
    const totalCostOfLargePizzas = listOfLargePizzas.length === 0
                                   ? 0
                                   : this.calculateLargePizzaPrice(listOfLargePizzas);

    const listOfExtraLargePizzas = this.listOfPizzas.filter(t => String(t.size)==='extraLarge');
    const totalCostOfExtraLargePizzas = listOfExtraLargePizzas.length === 0 
                                        ? 0
                                        :this.calculatePriceOfPizza(listOfExtraLargePizzas[0]) * listOfExtraLargePizzas.length;
    
    this.price = totalCostOfSmallPizzas + totalCostOfMediumPizzas + totalCostOfLargePizzas + totalCostOfExtraLargePizzas;
  }

  public calculatePizzaCount(pizzaSize) {
    return this.listOfPizzas.filter(item => item.size === pizzaSize).length;
  }

  private calculateMediumPizzaPrice(listOfMediumPizzas:Pizza[]) {
    if(listOfMediumPizzas.length === 1 && listOfMediumPizzas[0].pizzaToppings.length >=2) {
      return 5;
    }
    else if(listOfMediumPizzas.length ===2 && listOfMediumPizzas[0].pizzaToppings.length >=4) {
      return 9;
    }
    else if(listOfMediumPizzas.length > 2 && listOfMediumPizzas[0].pizzaToppings.length >=4) {
      return 9 + (listOfMediumPizzas.length-2) * this.calculatePriceOfPizza(listOfMediumPizzas[0])
    }
    return this.calculatePriceOfPizza(listOfMediumPizzas[0]) * listOfMediumPizzas.length;
  }

  private calculateLargePizzaPrice(listOfLargePizzas:Pizza[]) {
     if(listOfLargePizzas.length >= 1 && listOfLargePizzas[0].pizzaToppings.length >= 4) {
      const discountedPrice = this.calculatePriceOfPizza(listOfLargePizzas[0]) * 0.5;
      return discountedPrice * listOfLargePizzas.length;
    }
    else if(listOfLargePizzas[0].pizzaToppings.length <= 4) {
      return this.calculatePriceOfPizza(listOfLargePizzas[0]) * listOfLargePizzas.length;
    }

  }

  private calculatePriceOfPizza(pizza:Pizza) {
    return pizza.price + pizza.pizzaToppings.reduce((previous,current)=>previous+current.price,0);
  }
}

export enum PizzaSize {
  small = 5,
  medium = 7,
  large = 8,
  extraLarge = 9
}

export class Pizza {
  size: PizzaSize;
  pizzaToppings: PizzaTopping[];
  price: number;
}

export class PizzaTopping {
  name: string;
  price: number;
  type: string;
}




